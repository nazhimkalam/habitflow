import React, { useEffect, useState } from "react";
import axios from "axios";
import { getBadge } from "../utils/getBadge";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Fab,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  Stack,
  Chip,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddHabitDialog from "../components/AddHabitDialog";

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editHabit, setEditHabit] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  const fetchHabits = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5001/api/habits", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits(response.data);
    } catch (err) {
      console.error("Error fetching habits:", err);
      alert("Failed to load habits");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const token = localStorage.getItem("token");

  const handleNewHabit = (habit) => {
    setHabits((prev) => [...prev, habit]);
  };

  const handleUpdateHabit = (updated) => {
    setHabits((prev) => prev.map((h) => (h._id === updated._id ? updated : h)));
  };

  const handleDeleteHabit = async () => {
    try {
      await axios.delete(`http://localhost:5001/api/habits/${confirmDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHabits((prev) => prev.filter((h) => h._id !== confirmDelete.id));
      setConfirmDelete({ open: false, id: null });
    } catch (err) {
      alert("Failed to delete habit");
    }
  };

  return (
    <Container maxWidth="md"  sx={{
      minHeight: "100vh",
      minWidth: "100vw",
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      display: "flex",
      flexDirection: "column",
      py: 5,
      alignItems: "center",
    }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="black" py={2}>
        My Habits
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : habits.length === 0 ? (
        <Typography>No habits found. Start by adding one!</Typography>
      ) : (
        <Grid container spacing={3}>
          {habits.map((habit) => {
            const badge = getBadge(habit.streak);
            return (
              <Grid item xs={12} sm={6} key={habit._id}>
                <Card elevation={4} sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Stack spacing={1}>
                      <Typography variant="h6" fontWeight={600}>
                        {habit.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {habit.description}
                      </Typography>

                      <Divider sx={{ my: 1 }} />

                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip label={`Freq: ${habit.frequency}`} color="info" size="small" />
                        <Chip label={`🔥 Streak: ${habit.streak}`} color="warning" size="small" />
                        {badge && (
                          <Chip
                            label={`🏅 ${badge.label}`}
                            color="success"
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        )}
                      </Stack>

                      <Button
                        size="small"
                        variant="outlined"
                        onClick={async () => {
                          try {
                            const res = await axios.patch(
                              `http://localhost:5001/api/habits/${habit._id}/checkin`,
                              {},
                              {
                                headers: { Authorization: `Bearer ${token}` },
                              }
                            );
                            setHabits((prev) =>
                              prev.map((h) => (h._id === res.data._id ? res.data : h))
                            );
                          } catch (err) {
                            alert("Check-in failed");
                          }
                        }}
                        sx={{ mt: 1 }}
                      >
                        ✅ Mark as Done Today
                      </Button>

                      <Box display="flex" justifyContent="flex-end" mt={1}>
                        <IconButton onClick={() => {
                          setEditHabit(habit);
                          setOpenDialog(true);
                        }}>
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {
                          setConfirmDelete({ open: true, id: habit._id });
                        }}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Fab
        color="primary"
        onClick={() => {
          setEditHabit(null);
          setOpenDialog(true);
        }}
        sx={{ position: "fixed", bottom: 30, right: 30 }}
      >
        <AddIcon />
      </Fab>

      <AddHabitDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        onHabitCreated={handleNewHabit}
        onHabitUpdated={handleUpdateHabit}
        editData={editHabit}
      />

      <Dialog
        open={confirmDelete.open}
        onClose={() => setConfirmDelete({ open: false, id: null })}
      >
        <DialogTitle>Delete this habit?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>
            Cancel
          </Button>
          <Button onClick={handleDeleteHabit} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
