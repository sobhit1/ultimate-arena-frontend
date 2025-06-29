import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    Button,
    Chip,
    useTheme,
    Stack,
    Box,
    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    AccessTime,
    People,
    HowToReg,
    ExitToApp,
    EmojiEvents,
    Visibility,
    Edit
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ScrollableSection from './ScrollableSection';
import { useState } from 'react';

const StatusBadge = styled(Chip)(({ theme, status }) => ({
    fontWeight: 600,
    backgroundColor:
        status === 'ongoing' ? `${theme.palette.status.ongoing}22` :
            status === 'completed' ? `${theme.palette.status.completed}22` :
                `${theme.palette.status.upcoming}22`,
    color:
        status === 'ongoing' ? theme.palette.status.ongoing :
            status === 'completed' ? theme.palette.status.completed :
                theme.palette.status.upcoming,
    borderRadius: '4px',
    fontSize: '0.75rem',
    height: 24,
    minWidth: 90
}));

const ContestCard = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.shadows[4]
    }
}));

const getContestStatus = (startDateTime, length) => {
    const now = new Date();
    const endTime = new Date(startDateTime.getTime() + length * 60000);

    if (now < startDateTime) return 'upcoming';
    if (now > endTime) return 'completed';
    return 'ongoing';
};

const parseDateTime = (dateStr, timeStr) => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const [hours, minutes] = timeStr.split(':').map(Number);

    return new Date(year, month - 1, day, hours, minutes);
};

const ActionButton = ({ action, onClick, isCreator, status }) => {
    const theme = useTheme();

    const buttonConfig = {
        register: {
            color: 'primary',
            icon: <HowToReg fontSize="small" />,
            text: 'Register'
        },
        unregister: {
            color: 'error',
            icon: <ExitToApp fontSize="small" />,
            text: 'Unregister'
        },
        enter: {
            color: 'success',
            icon: <EmojiEvents fontSize="small" />,
            text: 'Enter Contest',
            style: {
                background: `linear-gradient(135deg, ${theme.palette.success.main} 0%, ${theme.palette.success.dark} 100%)`,
                color: theme.palette.getContrastText(theme.palette.success.main)
            }
        },
        standings: {
            color: 'info',
            icon: <Visibility fontSize="small" />,
            text: 'View Standings'
        },
        edit: {
            color: 'warning',
            icon: <Edit fontSize="small" />,
            text: 'Edit Contest'
        }
    };

    const config = isCreator && status !== 'completed' ? buttonConfig.edit : buttonConfig[action];

    return (
        <Button
            variant={action === 'enter' ? 'contained' : 'outlined'}
            size="small"
            startIcon={config.icon}
            onClick={onClick}
            sx={{
                borderRadius: 2,
                px: 2,
                ...config.style,
                '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: theme.shadows[2]
                }
            }}
            color={config.color}
        >
            {config.text}
        </Button>
    );
};

const to12HourFormat = (time24h) => {
    if (!time24h) return '';
    
    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);
    
    if (isNaN(hour)) return '';
    
    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    
    return `${hour12}:${minutes} ${period}`;
};

function ContestTable({ columns, data, isMobile, currentUser }) {
    return (
        isMobile ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {data.map((row) => {
                    const startTime = parseDateTime(row.date, row.time);
                    const status = getContestStatus(startTime, row.length);
                    const isCreator = row.creator === currentUser;
                    const action = status === 'completed' ? 'standings' :
                        isCreator ? 'edit' :
                            status === 'ongoing' ? 'enter' : 'register';

                    return (
                        <ContestCard key={row.name} elevation={2}>
                            <Stack spacing={1.5}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        {row.name}
                                    </Typography>
                                    <StatusBadge label={status} status={status} />
                                </Box>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <AccessTime fontSize="small" sx={{ color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {row.date} {row.time}
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={2} alignItems="center">
                                    <People fontSize="small" sx={{ color: 'text.secondary' }} />
                                    <Typography variant="body2">
                                        {row.participants} Participants
                                    </Typography>
                                </Stack>

                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <ActionButton
                                        action={action}
                                        isCreator={isCreator}
                                        status={status}
                                    />
                                </Stack>
                            </Stack>
                        </ContestCard>
                    );
                })}
            </Box>
        ) : (
            <Paper sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 800 }}>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                            {columns.map((col) => (
                                <TableCell
                                    key={col}
                                    sx={{ fontWeight: 700, color: 'text.secondary' }}
                                >
                                    {col}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => {
                            const startTime = parseDateTime(row.date, row.time);
                            const status = getContestStatus(startTime, row.length);
                            const isCreator = row.creator === currentUser;
                            const action = status === 'completed' ? 'standings' :
                                status === 'ongoing' ? 'enter' :
                                    isCreator ? 'edit' : 'register';

                            return (
                                <TableRow hover key={row.name}>
                                    <TableCell>
                                        <Typography fontWeight={600}>{row.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/profile/${row.creator}`} style={{ textDecoration: 'none' }}>
                                            <Typography color="primary" sx={{ fontWeight: 500 }}>
                                                {row.creator}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <AccessTime fontSize="small" />
                                            <Box>
                                                <Typography>{row.date}</Typography>
                                                <Typography>{to12HourFormat(row.time)}</Typography>
                                            </Box>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{String(Math.floor(row.length / 60)).padStart(2, '0')}:{String(row.length % 60).padStart(2, '0')}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <StatusBadge label={status} status={status} />
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{row.participants}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <ActionButton
                                            action={action}
                                            isCreator={isCreator}
                                            status={status}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    );
}

function Contests() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [currentUser] = useState('ap12345');

    const [contests] = useState([
        {
            name: 'Contest-14',
            creator: 'ap12345',
            date: '27/05/2026',
            time: '20:05',
            length: 120,
            participants: 158
        },
        {
            name: 'Contest-11',
            creator: 'sobhit-raghav',
            date: '21/06/2025',
            time: '19:05',
            length: 120,
            participants: 142
        },
        {
            name: 'Contest-20',
            creator: 'sobhit_raghav',
            date: '13/02/2025',
            time: '20:05',
            length: 180,
            participants: 89
        },
        {
            name: 'Contest-10',
            creator: 'destroyer69',
            date: '05/02/2024',
            time: '20:05',
            length: 150,
            participants: 245
        }
    ]);

    const filterContests = (statusFilter) => {
        return contests.filter(contest => {
            const startTime = parseDateTime(contest.date, contest.time);
            const status = getContestStatus(startTime, contest.length);
            return statusFilter === 'active' ? status !== 'completed' : status === 'completed';
        });
    };

    const activeContests = filterContests('active');
    const pastContests = filterContests('completed');

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 }, px: { xs: 1, sm: 2 } }}>
            <Box sx={{ textAlign: 'center', mb: { xs: 3, sm: 4 } }}>
                <Button
                    variant="contained"
                    size="large"
                    component={Link}
                    to="/create-contest"
                    startIcon={<Edit />}
                    sx={{
                        px: 6,
                        py: 1.5,
                        fontSize: '1.1rem',
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: theme.shadows[4]
                        }
                    }}
                >
                    Create New Contest
                </Button>
            </Box>

            <ScrollableSection title="Active Contests">
                <ContestTable
                    columns={['Contest Name', 'Creator', 'Start Time', 'Length', 'Status', 'Participants', 'Action']}
                    data={activeContests}
                    isMobile={isMobile}
                    currentUser={currentUser}
                />
            </ScrollableSection>

            <ScrollableSection title="Past Contests">
                <ContestTable
                    columns={['Contest Name', 'Creator', 'Start Time', 'Length', 'Status', 'Participants', 'Action']}
                    data={pastContests}
                    isMobile={isMobile}
                    currentUser={currentUser}
                />
            </ScrollableSection>
        </Container>
    );
}

export default Contests;