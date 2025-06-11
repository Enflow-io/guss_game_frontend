import React from "react";
import { Box, Card, CardContent, Stack, Typography, Chip } from "@mui/material";
import InfoItem from "./info-item";
import { RoundStatus } from "../types";

interface RoundInfoProps {
  roundData: any;
  currentScores: number;
  userName: string;
}

const getTimeLeft = (targetTime?: string) => {
  if (!targetTime) return "--";
  const diff = Math.max(
    0,
    Math.floor((new Date(targetTime).getTime() - Date.now()) / 1000)
  );
  return diff;
};

const RoundInfo: React.FC<RoundInfoProps> = ({
  roundData,
  currentScores,
  userName,
}) => {
  const statusLabel = roundData?.status || "--";
  const endTimeLeft = getTimeLeft(roundData?.endTime);
  const startTimeLeft = getTimeLeft(roundData?.startTime);
  const winnerName = roundData?.winner?.username || "Нет победителя";
  const winnerScore = roundData?.winner?.score;
  const totalScores = roundData?.roundScores ?? "--";

  const isPending = roundData?.status === RoundStatus.PENDING;
  const isActive = roundData?.status === RoundStatus.ACTIVE;
  const isFinished = roundData?.status === RoundStatus.FINISHED;

  return (
    <Box className="RoundInfo">
      <Card elevation={3}>
        <CardContent>
          <Stack spacing={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary">
                Статус:
              </Typography>
              <Chip label={statusLabel} color="success" onClick={() => {}} />
            </Box>
            {isActive && (
              <InfoItem text="До конца раунда" value={endTimeLeft} />
            )}
            {isPending && (
              <InfoItem text="До начала раунда" value={startTimeLeft} />
            )}

            {isFinished && (
              <>
                <InfoItem text="Имя победителя" value={winnerName} />
                <InfoItem text="Очков у победителя" value={winnerScore} />
                <InfoItem text="Всего очков" value={totalScores} />
              </>
            )}

            <InfoItem text="Мои очки" value={currentScores || 0} />
            <InfoItem text="Текущий игрок" value={userName} />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoundInfo;
