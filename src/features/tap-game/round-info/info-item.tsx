import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface InfoItemProps {
    text: string;
    value: string | number;
}

const InfoItem: React.FC<InfoItemProps> = ({ text, value }) => (
    <Box>
        <Typography variant="body2" color="text.secondary">
            {text}
        </Typography>
        <Typography variant="h6" color="primary">
            {value}
        </Typography>
    </Box>
);

export default InfoItem;