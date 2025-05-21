import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Chip,
    Button,
    useTheme,
    Stack,
    useMediaQuery
} from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { styled } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';

const TimerBox = styled(Box)(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    padding: theme.spacing(0.6, 2),
    borderRadius: '8px',
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.shadows[2]
}));

function Problems() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const contestEndTime = new Date('2025-07-28T00:05:00').getTime();

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const difference = contestEndTime - now;

            if (difference > 0) {
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeLeft({ hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const problems = [
        {
            id: 1,
            name: 'Alice and Two Arrays',
            points: 100,
            solvedBy: 'sobhit_raghav',
            timeLimit: '2 seconds',
            memoryLimit: '256 MB'
        }
    ];

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, sm: 2 } }}>
            <Box sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: { xs: 3, md: 4 },
                gap: 2
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.75rem', sm: '2.5rem' },
                        background: theme.palette.primary.main,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                >
                    Contest-14 Problems
                </Typography>

                <Stack direction={isMobile ? 'column' : 'row'} alignItems="center" gap={2}>
                    <TimerBox>
                        <AccessTimeIcon fontSize="small" color="primary" />
                        <Typography variant="subtitle1" fontWeight={600} fontSize={18}>
                            Time Remaining: {String(timeLeft.hours).padStart(2, '0')}:
                            {String(timeLeft.minutes).padStart(2, '0')}:
                            {String(timeLeft.seconds).padStart(2, '0')}
                        </Typography>
                    </TimerBox>
                    <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Visibility />}
                        sx={{ borderRadius: 2 }}
                    >
                        View Standings
                    </Button>
                </Stack>
            </Box>

            <Paper elevation={3} sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper
            }}>
                <TableContainer component={Paper} sx={{ overflowX: 'auto', border: '1px solid', borderColor: 'divider' }}>
                    <Table sx={{ minWidth: 600 }}>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'background.default' }}>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Problem Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Constraints</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Points</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Solved By</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problems.map((problem, index) => (
                                <TableRow hover key={problem.id} sx={{ '&:last-child td': { borderBottom: 0 } }}>
                                    <TableCell sx={{ color: 'text.secondary' }}>{index + 1}.</TableCell>
                                    <TableCell>
                                        <MuiLink href="#" sx={{
                                            color: 'primary.main',
                                            fontWeight: 600,
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}>
                                            {problem.name}
                                        </MuiLink>
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                                            <Chip
                                                label={problem.timeLimit}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'action.selected',
                                                    fontSize: '0.75rem',
                                                    height: 24
                                                }}
                                            />
                                            <Chip
                                                label={problem.memoryLimit}
                                                size="small"
                                                sx={{
                                                    bgcolor: 'action.selected',
                                                    fontSize: '0.75rem',
                                                    height: 24
                                                }}
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>
                                        {problem.points}
                                    </TableCell>
                                    <TableCell>
                                        <MuiLink
                                            href="#" sx={{
                                                color: 'primary.main',
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' },
                                                fontWeight: 600
                                            }}
                                        >
                                            {problem.solvedBy}
                                        </MuiLink>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {problems.length === 0 && (
                    <Box sx={{
                        minHeight: 300,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 2
                    }}>
                        <Typography variant="h6" color="text.secondary">
                            No problems available for this contest
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default Problems;