import React from "react";
import {
  ListItem,
  Card,
  CardContent,
  Typography,
  ListItemText,
  Box,
} from "@mui/material";
import Link from "next/link";
import styles from "./round-thumb.module.scss";
import { Round } from "../types";
interface RoundThumbProps {
  round: Round;
}

const RoundThumb: React.FC<RoundThumbProps> = ({ round }) => {
  const formatDate = (date: Date) => {
    return new Date(date)
      .toLocaleString("ru-RU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  };
  return (
    <Link
      href={`/round/${round.id}`}
      key={round.id}
      style={{ textDecoration: "none" }}
    >
      <ListItem key={round.id} disablePadding sx={{ mb: 2 }}>
        <Card variant="outlined" className={styles.round}>
          <CardContent className={styles.cardContent}>
            <Typography variant="h6" component="div" className={styles.roundId}>
              Round ID: {round.id}
            </Typography>
            <ListItemText primary={`Start: ${formatDate(round.startTime)}`} />
            <ListItemText primary={`End: ${formatDate(round.endTime)}`} />
            <Box my={2}>
              <hr className={styles.divider} />
            </Box>
            <ListItemText
              primary={`Status: ${round.status}`}
              className={styles.status}
            />
          </CardContent>
        </Card>
      </ListItem>
    </Link>
  );
};

export default RoundThumb;
