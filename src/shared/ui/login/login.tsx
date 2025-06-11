"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/features/auth/authApi";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      if (error !== "Please enter both email and password.") {
        setError("Please enter both email and password.");
      }
      return;
    }

    try {
      const result = await login({ username: email, password }).unwrap();
      if (result && result.access_token) {
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("user_role", result.role || "user");
        localStorage.setItem("user_name", result.username || "guest");
        router.push("/");
      }
    } catch (err: any) {
      setError(err?.data?.message);
    }
  };

  return (
    <Box className={styles.loginRoot}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        autoComplete="off"
        className={styles.loginForm}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          className={styles.loginTitle}
        >
          Login
        </Typography>
        {error && (
          <Typography color="error" mb={2} className={styles.loginError}>
            {error}
          </Typography>
        )}
        <TextField
          label="Email"
          type="string"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="off"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          autoComplete="new-password"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          className={styles.loginButton}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
