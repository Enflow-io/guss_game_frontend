"use client";
import styles from "./page.module.scss";
import Button from "@mui/material/Button";
import { useCreateRoundMutation } from "@/features/tap-game/api/tapGameApi";
import { useRouter } from "next/navigation";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import RoundsList from "@/features/tap-game/rounds-list/rounds-list";

export default function HomePage() {
  const [createRound, { isLoading, error }] = useCreateRoundMutation();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const userRole =
      typeof window !== "undefined" ? localStorage.getItem("user_role") : null;
    const isAdmin = userRole === "admin";
    setIsAdmin(isAdmin);
  }, []);
  const handleCreateRound = async () => {
    try {
      const res = await createRound().unwrap();
      router.push(`/round/${res.id}`);
    } catch (err: any) {
      // 401 is now handled globally in baseQuery
      console.error("Failed to create round:", err);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_name");
      router.push("/login");
    }
  };
  return (
    <main className={styles.page}>
      <section className={styles.main}>
        <Box className={styles.header}>
          <Typography variant="h3" component="h2" gutterBottom>
            Welcome to The Last of Guss
          </Typography>
          <Button variant="outlined" color="info" onClick={handleLogout}>
            Logout
          </Button>
        </Box>

        {isAdmin && (
          <Button
            variant="contained"
            color="primary"
            className={styles.createRoundButton}
            onClick={handleCreateRound}
            disabled={isLoading}
          >
            Create Round
          </Button>
        )}

        <RoundsList />
      </section>
    </main>
  );
}
