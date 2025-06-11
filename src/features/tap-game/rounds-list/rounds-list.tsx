"use client";
import React from "react";
import styles from "./rounds-list.module.scss";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";
import Link from "next/link";
import RoundThumb from "../round-thumb/round-thumb";
import { useRequireAuth } from "@/shared/lib";
import { useGetRoundsQuery } from "../api/tapGameApi";

const RoundsList: React.FC = () => {
  useRequireAuth();
  const pollingInterval = Number(process.env.NEXT_PUBLIC_POLLING_INTERVAL) || 1000; // Default to 1000ms if not set
  const {
    data: rounds,
    error,
    isLoading,
  } = useGetRoundsQuery(undefined, { pollingInterval });

  return (
    <Box className={styles.roundsList}>
      <Typography variant="h4" component="h2" gutterBottom align="center">
        Rounds List
      </Typography>
      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}
      {rounds && rounds.length > 0 ? (
        <List>
          {rounds.map((round: any) => (
            <RoundThumb round={round} key={round.id} />
          ))}
        </List>
      ) : (
        !isLoading && (
          <Typography align="center" color="text.secondary">
            No rounds available.
          </Typography>
        )
      )}
    </Box>
  );
};

export default RoundsList;
