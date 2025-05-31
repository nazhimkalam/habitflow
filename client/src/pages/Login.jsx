import React from "react";
import { auth, provider, signInWithPopup } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper elevation={10} sx={{ p: 6, borderRadius: 4, maxWidth: 400, width: "100%" }}>
        <Stack direction="column" spacing={3} alignItems="center">
          <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
            <LoginIcon />
          </Avatar>
          <Typography variant="h4" fontWeight="bold" align="center">
            Welcome to HabitFlow
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Stay consistent. Build better habits. One step at a time.
          </Typography>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={handleLogin}
            fullWidth
            size="large"
            sx={{
              mt: 2,
              backgroundColor: "#db4437",
              "&:hover": { backgroundColor: "#c23321" },
              textTransform: "none",
              fontWeight: "bold"
            }}
          >
            Sign in with Google
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
