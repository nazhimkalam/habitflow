import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Divider,
} from "@mui/material";
import axios from "axios";

const AddHabitDialog = ({ open, handleClose, onHabitCreated, onHabitUpdated, editData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    frequency: "daily",
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        title: "",
        description: "",
        frequency: "daily",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      if (editData) {
        const res = await axios.put(
          `http://localhost:5001/api/habits/${editData._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        onHabitUpdated(res.data);
      } else {
        const res = await axios.post("http://localhost:5001/api/habits", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onHabitCreated(res.data);
      }
      handleClose();
    } catch (err) {
      alert("Failed to save habit");
    } finally {
      setFormData({
        title: "",
        description: "",
        frequency: "daily",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          paddingX: 2,
          paddingY: 1,
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: "bold" }}>
        {editData ? "Edit Habit" : "Create New Habit"}
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            required
            label="Habit Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            multiline
            rows={3}
          />

          <TextField
            fullWidth
            select
            label="Frequency"
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
          >
            <MenuItem value="daily">Daily</MenuItem>
            <MenuItem value="weekly">Weekly</MenuItem>
            <MenuItem value="monthly">Monthly</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit" variant="text">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {editData ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHabitDialog;
