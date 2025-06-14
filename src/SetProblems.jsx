import {
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Autocomplete,
    MenuItem,
    Button,
    Chip,
    Stack,
    TextField,
    IconButton,
    Grid,
    InputAdornment,
    Alert,
    Snackbar,
    Box,
    Typography,
    useTheme
} from '@mui/material';
import { styled } from '@mui/system';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MuiLink from '@mui/material/Link';

const to12HourFormat = (time24h) => {
    if (!time24h) return '';

    const parts = time24h.split(':');
    if (parts.length < 2) return time24h;

    const hours = parts[0];
    const minutes = parts[1];

    const hour = parseInt(hours, 10);
    if (isNaN(hour)) return time24h;

    const period = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
};

const DetailItem = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],
    borderLeft: `4px solid ${theme.palette.primary.main}`,
    height: '100%',
    transition: 'all 0.2s ease',
    '&:hover': {
        boxShadow: theme.shadows[4],
        transform: 'translateY(-2px)'
    }
}));

const DetailTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    color: theme.palette.text.secondary,
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: theme.spacing(0.5)
}));

const DetailValue = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '1.1rem',
    color: theme.palette.text.primary
}));

function SetProblems() {
    const theme = useTheme();
    const [tags, setTags] = useState([]);
    const [ratingLower, setRatingLower] = useState(800);
    const [ratingUpper, setRatingUpper] = useState(3500);
    const [points, setPoints] = useState('');
    const [problems, setProblems] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('12:00');
    const [contestLength, setContestLength] = useState({ hours: 2, minutes: 0 });
    const [savedContest, setSavedContest] = useState(null);
    const [isContestCreated, setIsContestCreated] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'error',
    });

    const availableTags = [
        '2-sat', 'binary search', 'bitmasks', 'brute force', 'chinese remainder theorem',
        'combinatorics', 'constructive algorithms', 'data structures', 'dfs and similar',
        'divide and conquer', 'dp', 'dsu', 'expression parsing', 'fft', 'flows', 'games',
        'geometry', 'graph matchings', 'graphs', 'greedy', 'hashing', 'implementation',
        'interactive', 'math', 'matrices', 'meet-in-the-middle', 'number theory',
        'probabilities', 'schedules', 'shortest paths', 'sortings', 'string suffix structures',
        'strings', 'ternary search', 'trees', 'two pointers'
    ];
    const ratingOptions = Array.from({ length: 28 }, (_, i) => (800 + 100 * i));

    useEffect(() => {
        const fetchContestData = async () => {
            try {
                const response = await fetch('/api/contest');
                if (!response.ok) throw new Error('Failed to fetch contest data');
                const data = await response.json();

                if (data) {
                    setSavedContest(data);
                    setIsContestCreated(true);
                    setStartDate(data.startDate);
                    setStartTime(data.startTime || '12:00');
                    setContestLength({
                        hours: Math.floor(data.duration / 60),
                        minutes: data.duration % 60
                    });
                    setProblems(data.problems || []);
                }
            } catch (error) {
                console.error('Error fetching contest data:', error);
            }
        };
        fetchContestData();
    }, []);

    const handleAddProblem = async () => {
        if (isContestCreated) {
            setSnackbar({
                open: true,
                message: 'Cannot add problems after contest is created',
                severity: 'error'
            });
            return;
        }

        if (!tags.length || !ratingLower || !ratingUpper || !points || points <= 0) {
            setSnackbar({
                open: true,
                message: 'Please fill all problem criteria',
                severity: 'error'
            });
            return;
        }

        try {
            const newProblem = {
                name: `Problem ${problems.length + 1}`,
                timeLimit: '2 sec',
                memoryLimit: '256 MB',
                points,
                tags: [...tags],
                ratingLower,
                ratingUpper
            };

            const response = await fetch('/api/problems', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProblem),
            });

            if (!response.ok) throw new Error('Failed to save problem');

            const savedProblem = await response.json();
            setProblems(prev => [...prev, { ...savedProblem, id: Date.now() }]);
            setPoints('');
            setTags([]);
            setRatingLower(800);
            setRatingUpper(3500);

            setSnackbar({
                open: true,
                message: 'Problem added successfully!',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to add problem',
                severity: 'error'
            });
        }
    };

    const handleSave = async () => {
        if (!startDate || !startTime || (!contestLength.hours && !contestLength.minutes)) {
            setSnackbar({
                open: true,
                message: 'Please fill all required fields',
                severity: 'error'
            });
            return;
        }

        const hours = contestLength.hours || 0;
        const minutes = contestLength.minutes || 0;
        const duration = hours * 60 + minutes;

        if (duration <= 0) {
            setSnackbar({
                open: true,
                message: 'Duration must be greater than 0',
                severity: 'error'
            });
            return;
        }

        try {
            // Validate time format
            const timeRegex = /^([01]?\d|2[0-3]):[0-5]\d$/;
            if (!timeRegex.test(startTime)) {
                setSnackbar({
                    open: true,
                    message: 'Invalid time format. Use HH:MM (24-hour format)',
                    severity: 'error'
                });
                return;
            }

            const contestData = {
                startDate,
                startTime,
                duration,
                problems
            };

            const response = await fetch('/api/contests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contestData),
            });

            if (!response.ok) throw new Error('Failed to save contest');

            const savedData = await response.json();
            setSavedContest(savedData);
            setIsContestCreated(true);

            setSnackbar({
                open: true,
                message: 'Contest created successfully!',
                severity: 'success'
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: error.message || 'Failed to save contest',
                severity: 'error'
            });
        }
    };

    const handleDurationChange = (field, value) => {
        const parsedValue = parseInt(value) || 0;
        setContestLength(prev => ({
            ...prev,
            [field]: parsedValue
        }));
    };

    const handleTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        fontSize: { xs: '1.75rem', sm: '2.5rem' },
                        background: theme.palette.primary.main,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1
                    }}
                >
                    Contest-Setup
                </Typography>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Contest Details Display */}
            <Paper elevation={0} sx={{
                p: 2,
                mb: 4,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.default'
            }}>
                <Typography variant="h6" gutterBottom sx={{
                    fontWeight: 600,
                    pb: 1,
                    mb: 2,
                    borderBottom: '2px solid',
                    borderColor: 'divider'
                }}>
                    Contest Details
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} width={{ xs: '100%', md: '30%' }}>
                        <DetailItem>
                            <DetailTitle>Start Date</DetailTitle>
                            <DetailValue>
                                {savedContest?.startDate || 'Not Set'}
                            </DetailValue>
                        </DetailItem>
                    </Grid>

                    <Grid item xs={12} md={4} width={{ xs: '100%', md: '30%' }}>
                        <DetailItem sx={{ borderLeftColor: 'white' }}>
                            <DetailTitle>Start Time</DetailTitle>
                            <DetailValue>
                                {savedContest?.startTime ?
                                    to12HourFormat(savedContest.startTime) :
                                    'Not Set'
                                }
                            </DetailValue>
                        </DetailItem>
                    </Grid>

                    <Grid item xs={12} md={4} width={{ xs: '100%', md: '30%' }}>
                        <DetailItem sx={{ borderLeftColor: 'success.main' }}>
                            <DetailTitle>DURATION</DetailTitle>
                            <DetailValue>
                                {savedContest?.duration ?
                                    `${Math.floor(savedContest.duration / 60)}h ${savedContest.duration % 60}m` :
                                    'Not Set'
                                }
                            </DetailValue>
                        </DetailItem>
                    </Grid>
                </Grid>
            </Paper>

            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6} sx={{ position: 'relative', width: 200 }}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            slotProps={{ inputLabel: { shrink: true } }}
                            inputRef={(input) => (window.dateInputRef = input)}
                        />
                        <IconButton
                            sx={{ position: 'absolute', top: '50%', right: 4, transform: 'translateY(-50%)' }}
                            onClick={() => window.dateInputRef?.showPicker?.()}
                        >
                            <CalendarTodayIcon color={"warning"} />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ position: 'relative', width: 150 }}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={startTime}
                            onChange={handleTimeChange}
                            inputRef={(input) => (window.timeInputRef = input)}
                            slotProps={{
                                inputLabel: { shrink: true },
                                input: {
                                    placeholder: "HH:mm"
                                }
                            }}
                        />
                        <IconButton
                            sx={{ position: 'absolute', top: '50%', right: 6, transform: 'translateY(-50%)' }}
                            onClick={() => window.timeInputRef?.showPicker?.()}
                        >
                            <AccessTimeIcon color={"warning"} />
                        </IconButton>
                    </Grid>

                    <Grid item xs={6} md={3} sx={{ width: 150 }}>
                        <TextField
                            fullWidth
                            label="Duration Hours"
                            type="number"
                            value={contestLength.hours || ''}
                            onChange={(e) => {
                                const cleanedValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                                let parsedValue = parseInt(cleanedValue || 0);
                                parsedValue = Math.max(0, parsedValue);
                                const finalValue = cleanedValue === '' ? '' : parsedValue;
                                handleDurationChange('hours', finalValue);
                            }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            slotProps={{
                                input: {
                                    inputProps: { min: 0 },
                                    startAdornment: <InputAdornment position="start">H</InputAdornment>
                                }
                            }}
                        />
                    </Grid>

                    <Grid item xs={6} md={3} sx={{ width: 150 }}>
                        <TextField
                            fullWidth
                            label="Duration Minutes"
                            type="number"
                            value={contestLength.minutes || ''}
                            onChange={(e) => {
                                const cleanedValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                                let parsedValue = parseInt(cleanedValue || 0);
                                parsedValue = Math.min(59, Math.max(0, parsedValue));
                                const finalValue = cleanedValue === '' ? '' : parsedValue;
                                handleDurationChange('minutes', finalValue);
                            }}
                            onKeyDown={(e) => {
                                if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                                    e.preventDefault();
                                }
                            }}
                            slotProps={{
                                input: {
                                    inputProps: { min: 0, max: 59 },
                                    startAdornment: <InputAdornment position="start">M</InputAdornment>
                                }
                            }}
                        />
                    </Grid>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleSave}
                        sx={{ px: 5, py: 0.1, fontSize: '1.1rem', borderRadius: 2, height: 50 }}
                    >
                        Save Details
                    </Button>
                </Grid>

                <Grid container spacing={2} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={5} sx={{ width: 400 }}>
                        <Autocomplete
                            multiple
                            options={availableTags}
                            value={tags}
                            onChange={(event, newValue) => setTags(newValue)}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        label={option.toUpperCase()}
                                        {...getTagProps({ index })}
                                        size="small"
                                        color="primary"
                                    />
                                ))
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tags"
                                    placeholder="Select tags"
                                />
                            )}
                        />
                    </Grid>

                    <Grid item xs={6} md={2} sx={{ width: 150 }}>
                        <TextField
                            select
                            fullWidth
                            label="Rating Min"
                            value={ratingLower}
                            onChange={(e) => setRatingLower(e.target.value)}
                        >
                            {ratingOptions.map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={6} md={2} sx={{ width: 150 }}>
                        <TextField
                            select
                            fullWidth
                            label="Rating Max"
                            value={ratingUpper}
                            onChange={(e) => setRatingUpper(e.target.value)}
                        >
                            {ratingOptions.map((value) => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={3} sx={{ width: 150 }}>
                        <TextField
                            fullWidth
                            label="Points"
                            type="number"
                            value={points}
                            onChange={(e) => {
                                const cleanedValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                                let parsedValue = parseInt(cleanedValue || 0);
                                parsedValue = Math.max(0, parsedValue);
                                const finalValue = cleanedValue === '' ? '' : parsedValue;
                                setPoints(finalValue);
                            }}
                        />
                    </Grid>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddProblem}
                        sx={{ px: 5, py: 0.1, fontSize: '1.1rem', borderRadius: 2, height: 50 }}
                    >
                        Add Problem
                    </Button>
                </Grid>

                <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'background.default' }}>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>#</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Problem Name</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Constraints</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Rating Range</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Points</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Tags</TableCell>
                                <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problems.map((problem, index) => (
                                <TableRow key={problem.id}>
                                    <TableCell>{index + 1}</TableCell>
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
                                    <TableCell sx={{ fontWeight: 600 }}>{problem.ratingLower} - {problem.ratingUpper}</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }}>{problem.points}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1}>
                                            {problem.tags.map(tag => (
                                                <Chip key={tag} label={tag.toUpperCase()} color="primary" size="small" />
                                            ))}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => setProblems(prev => prev.filter(p => p.id !== problem.id))}
                                        >
                                            <DeleteIcon color={"error"} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}

export default SetProblems;