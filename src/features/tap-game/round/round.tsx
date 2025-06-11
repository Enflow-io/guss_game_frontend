"use client";
import React, { useEffect } from "react";
import styles from "./round.module.scss";
import { useThrottle } from "./useThrottle";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import RoundInfo from "../round-info/round-info";
import { useGetRoundByIdQuery, useTapMutation } from "../api/tapGameApi";
import { GUSS } from "../types";

interface RoundProps {
  roundId: string;
}

const Round: React.FC<RoundProps> = (props) => {
  const [tap, { isLoading, isSuccess, isError }] = useTapMutation();

  const throttledTap = useThrottle(
    async () => {
      const scores = await tap({ roundId: props.roundId }).unwrap();
      setCurrentScores(parseInt(scores));
    },
    20,
    1000
  );

  const handleTap = () => {
    throttledTap();
  };

  const [userName, setUserName] = React.useState<string>("");
  useEffect(() => {
    const storedUserName = localStorage.getItem("user_name") || "guest";
    setUserName(storedUserName);
  }, []);

  const [currentScores, setCurrentScores] = React.useState<number>(0);
  const pollingInterval = Number(process.env.NEXT_PUBLIC_POLLING_INTERVAL) || 1000; // Default to 1000ms if not set
  const {
    data: roundData,
    isLoading: isRoundLoading,
    isError: isRoundError,
  } = useGetRoundByIdQuery(props.roundId, { pollingInterval });

  useEffect(() => {
    if (currentScores === 0 && roundData) {
      setCurrentScores(roundData.currentUserScore);
    }
  }, [roundData]);

  return (
    <div className={styles.round}>
      {isRoundLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {roundData && (
        <>
          <div className={styles.leftPanel}>
            <Card elevation={3} className={styles.cardFontSmall}>
              <CardContent className={styles.cardContent}>
                <div className={styles.GussPic} onClick={handleTap}>
                  <pre>{GUSS}</pre>
                </div>

                <Box mt={2} display="flex" justifyContent="left">
                  <button
                    className={styles.tapButton}
                    onClick={handleTap}
                    disabled={isLoading}
                  >
                    TAP
                  </button>
                </Box>
              </CardContent>
            </Card>
          </div>
          <div className={styles.rightPanel}>
            <RoundInfo
              roundData={roundData}
              currentScores={currentScores}
              userName={userName}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Round;
