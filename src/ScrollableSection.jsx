import { Box, Typography } from '@mui/material';

const ScrollableSection = ({ title, children }) => (
    <Box sx={{ mb: 4 }}>
        <Typography
            variant="h6"
            sx={{
                p: 1,
                mb: 2,
                borderBottom: 2,
                borderColor: 'divider',
                fontWeight: 600,
                fontSize: { xs: '1.1rem', sm: '1.5rem' }
            }}
        >
            {title}
        </Typography>
        <Box sx={{ overflowX: 'auto', pb: 2 }}>
            {children}
        </Box>
    </Box>
);

export default ScrollableSection;