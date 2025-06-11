export interface Round {
    id: number;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    status: string
}

export const GUSS = `            ░░░░░░░░░░░░░░░            │
│          ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░           │
│        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░         │
│        ░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░         │
│      ░░░░▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓░░░░       │
│    ░░▒▒▒▒░░░░▓▓▓▓▓▓▓▓▓▓▓▓░░░░▒▒▒▒░░   │
│    ░░▒▒▒▒▒▒▒▒░░░░░░░░░░░░▒▒▒▒▒▒▒▒░░   │
│    ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░   │
│      ░░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░     │
│        ░░░░░░░░░░░░░░░░░░░░░░░░░░     │
`;

export enum RoundStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}
