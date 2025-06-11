"use client";
import Round from "@/features/tap-game/round/round";
import { Button, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import styles from "./page.module.scss";

const RoundPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  return (
    <main>
      <div className={styles.container}>
        <Typography variant="h4" component="h2" gutterBottom>
          Round ID: {params.id}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={styles.seeAllRoundsButton}
          onClick={() => {
            router.push("/");
          }}
        >
          See all rounds
        </Button>
      </div>
      {params.id && <Round roundId={params.id.toString()} />}
    </main>
  );
};

export default RoundPage;
