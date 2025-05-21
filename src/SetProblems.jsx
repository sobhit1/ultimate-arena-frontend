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
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MuiLink from '@mui/material/Link';

function SetProblems() {
    const theme = useTheme();
    const [tags, setTags] = useState([]);
    const [ratingLower, setRatingLower] = useState(800);
    const [ratingUpper, setRatingUpper] = useState(3500);
    const [points, setPoints] = useState();
    const [problems, setProblems] = useState([
        {
            id: 1,
            name: 'Binary Tree Traversal',
            timeLimit: '2 sec',
            memoryLimit: '256 MB',
            points: 100,
            tags: ['tree', 'recursion'],
            ratingLower: 800,
            ratingUpper: 1200
        },
        {
            id: 2,
            name: 'Shortest Path Algorithm',
            timeLimit: '1 sec',
            memoryLimit: '512 MB',
            points: 200,
            tags: ['graph', 'bfs'],
            ratingLower: 1200,
            ratingUpper: 1600
        }
    ]);
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('12:00');
    const [contestLength, setContestLength] = useState({});
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

    const handleAddProblem = async () => {
        if (!tags.length || !ratingLower || !ratingUpper || points <= 0) {
            setSnackbar({
                open: true,
                message: 'Please fill all problem criteria',
                severity: 'error'
            });
            return;
        }

        const newProblem = {
            id: Date.now(),
            name: `Problem ${problems.length + 1}`,
            timeLimit: '2 sec',
            memoryLimit: '256 MB',
            points,
            tags: [...tags],
            ratingLower,
            ratingUpper
        };

        setProblems(prev => [...prev, newProblem]);
        setTags([]);
        setRatingLower(800);
        setRatingUpper(3500);
        setPoints();

        setSnackbar({
            open: true,
            message: 'Problem added successfully!',
            severity: 'success'
        });
    };

    const handleSave = async () => {
        if (!startDate || !startTime) {
            setSnackbar({
                open: true,
                message: 'Please fill all required fields',
                severity: 'error'
            });
            return;
        }

        console.log('Contest saved:', {
            start: `${startDate}T${startTime}`,
            duration: contestLength.hours * 60 + contestLength.minutes,
            problems
        });

        setSnackbar({
            open: true,
            message: 'Contest timing and duration are saved successfully!',
            severity: 'success'
        });
    };

    const handleDurationChange = (field, value) => {
        const parsedValue = parseInt(value);
        setContestLength(prev => ({
            ...prev,
            [field]: parsedValue
        }));
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

            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={6} sx={{ position: 'relative', width: 200 }}>
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputRef={(input) => (window.dateInputRef = input)}
                        />
                        <IconButton
                            sx={{ position: 'absolute', top: '50%', right: 4, transform: 'translateY(-50%)' }}
                            onClick={() => window.dateInputRef?.showPicker?.()}
                        >
                            <CalendarTodayIcon color="warning" />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ position: 'relative', width: 150 }}>
                        <TextField
                            fullWidth
                            label="Start Time"
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                            inputRef={(input) => (window.timeInputRef = input)}
                        />
                        <IconButton
                            sx={{ position: 'absolute', top: '50%', right: 6, transform: 'translateY(-50%)' }}
                            onClick={() => window.timeInputRef?.showPicker?.()}
                        >
                            <AccessTimeIcon color="warning" />
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
                                if (
                                    ['e', 'E', '+', '-', '.'].includes(e.key)
                                ) {
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
                                if (
                                    ['e', 'E', '+', '-', '.'].includes(e.key)
                                ) {
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
                        sx={{ px: 5, py: 0.1, fontSize: '1.1rem', borderRadius: 2 }}
                    >
                        Save
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
                            onChange={
                                (e) => {
                                    const cleanedValue = e.target.value.replace(/\D/g, '').replace(/^0+/, '');
                                    let parsedValue = parseInt(cleanedValue || 0);
                                    parsedValue = Math.max(0, parsedValue);
                                    const finalValue = cleanedValue === '' ? '' : parsedValue;
                                    setPoints(finalValue)
                                }
                            }
                        />
                    </Grid>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleAddProblem}
                        sx={{ px: 5, py: 0.1, fontSize: '1.1rem', borderRadius: 2 }}
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
                                        <IconButton onClick={() =>
                                            setProblems(prev => prev.filter(p => p.id !== problem.id))
                                        }>
                                            <DeleteIcon color="error" />
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