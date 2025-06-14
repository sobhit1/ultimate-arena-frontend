import React, { useState, useMemo } from 'react';
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
    useTheme,
    Skeleton,
    IconButton,
    Stack,
    Button
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { EmojiEvents, ExpandMore, ExpandLess } from '@mui/icons-material';

const RankBadge = styled(Box)(({ theme, rank }) => ({
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 700,
    backgroundColor:
        rank === 1 ? '#ffd700' :
            rank === 2 ? '#c0c0c0' :
                rank === 3 ? '#cd7f32' : theme.palette.background.paper,
    color: rank <= 3 ? theme.palette.getContrastText(
        rank === 1 ? '#ffd700' :
            rank === 2 ? '#c0c0c0' :
                '#cd7f32'
    ) : theme.palette.text.secondary
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
        transition: 'background-color 0.2s ease'
    },
    '&.highlighted': {
        background: `linear-gradient(90deg, ${theme.palette.primary.light}22 0%, transparent 100%)`
    }
}));

const ProblemChip = styled(Chip)(({ theme, solved }) => ({
    height: 24,
    borderRadius: '4px',
    backgroundColor: solved ? `${theme.palette.success.main}22` : `${theme.palette.error.main}22`,
    color: solved ? theme.palette.success.main : theme.palette.error.main,
    fontWeight: 600,
    '& .MuiChip-label': { px: 1.2 }
}));

function Standings() {
    const theme = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const [expandedUser, setExpandedUser] = useState(null);
    const isLoading = false;
    const itemsPerPage = 10;

    const standings = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        username: `user${i + 1}`,
        rank: i + 1,
        totalPoints: 450 - (i * 20),
        problemsSolved: Math.floor(Math.random() * 5) + 1,
        problemStatus: Array(5).fill().map(() => Math.random() > 0.5)
    }));

    const totalPages = useMemo(() =>
        Math.ceil(standings.length / itemsPerPage),
        [standings.length, itemsPerPage]
    );

    const paginatedStandings = useMemo(() =>
        standings.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
        ),
        [currentPage, standings, itemsPerPage]
    );

    const handleRowClick = (userId) => {
        setExpandedUser(expandedUser === userId ? null : userId);
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 3 }, px: { xs: 1, sm: 2 } }}>
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
                    Contest-14 Standings
                </Typography>
            </Box>

            <Paper elevation={3} sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: `1px solid ${theme.palette.divider}`,
                background: theme.palette.background.paper
            }}>
                <TableContainer>
                    <Table sx={{ minWidth: 800 }}>
                        <TableHead sx={{ bgcolor: 'background.default' }}>
                            <TableRow>
                                {['Rank', 'Participant', 'Problems Solved', 'Total Points', 'Details'].map((header) => (
                                    <TableCell
                                        key={header}
                                        sx={{ fontWeight: 700, color: 'text.secondary' }}
                                    >
                                        {header}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                Array(itemsPerPage).fill().map((_, index) => (
                                    <StyledTableRow key={`skeleton-${currentPage}-${index}`}>
                                        <TableCell><Skeleton variant="rectangular" width={40} height={32} /></TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Skeleton variant="circular" width={40} height={40} />
                                                <Skeleton variant="text" width={120} />
                                            </Box>
                                        </TableCell>
                                        {Array(4).fill().map((_, i) => (
                                            <TableCell key={`skeleton-${currentPage}-${index}-${i}`}>
                                                <Skeleton variant="text" width={i === 2 ? '60%' : '40%'} />
                                            </TableCell>
                                        ))}
                                    </StyledTableRow>
                                ))
                            ) : paginatedStandings.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} sx={{ py: 6, textAlign: 'center' }}>
                                        <Typography variant="h6" color="text.secondary">
                                            No standings available yet
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedStandings.map((entry) => (
                                    <>
                                        <StyledTableRow
                                            key={entry.id}
                                            hover
                                            onClick={() => handleRowClick(entry.id)}
                                            className={expandedUser === entry.id ? 'highlighted' : ''}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell>
                                                <RankBadge rank={entry.rank}>
                                                    {entry.rank < 4 ? <EmojiEvents fontSize="small" /> : entry.rank}
                                                </RankBadge>
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                        '&:hover .username': {
                                                            textDecoration: 'underline',
                                                            textDecorationColor: 'primary.main'
                                                        },
                                                    }}
                                                >
                                                    <Typography
                                                        className="username"
                                                        variant="body1"
                                                        fontWeight={600}
                                                        color="primary"
                                                        sx={{ textDecoration: 'none' }}
                                                    >
                                                        {entry.username}
                                                    </Typography>
                                                </Box>
                                            </TableCell>

                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                    {entry.problemStatus.map((solved, idx) => (
                                                        <ProblemChip
                                                            key={idx}
                                                            label={`P${idx + 1}`}
                                                            solved={solved}
                                                            size="small"
                                                        />
                                                    ))}
                                                </Box>
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: 700, color: 'primary.main' }}>
                                                {entry.totalPoints}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton size="small">
                                                    {expandedUser === entry.id ? <ExpandLess /> : <ExpandMore />}
                                                </IconButton>
                                            </TableCell>
                                        </StyledTableRow>

                                        {expandedUser === entry.id && (
                                            <TableRow>
                                                <TableCell colSpan={6} sx={{ py: 2, bgcolor: 'background.default' }}>
                                                    <Box sx={{ display: 'flex', gap: 4, px: 4 }}>
                                                        <Box>
                                                            <Typography variant="subtitle2" color="text.secondary" mb={1}>
                                                                Problems Breakdown
                                                            </Typography>
                                                            <Stack direction="row" gap={1.5}>
                                                                {entry.problemStatus.map((solved, idx) => (
                                                                    <ProblemChip
                                                                        key={idx}
                                                                        label={`P${idx + 1}: ${solved ? '100' : '0'}`}
                                                                        solved={solved}
                                                                    />
                                                                ))}
                                                            </Stack>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {totalPages > 1 && (
                    <Box sx={{
                        p: 2,
                        borderTop: `1px solid ${theme.palette.divider}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Typography variant="body2" color="text.secondary">
                            Page {currentPage} of {totalPages}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="outlined"
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(p => p - 1)}
                                startIcon={<ExpandLess sx={{ transform: 'rotate(90deg)' }} />}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outlined"
                                disabled={currentPage === totalPages}
                                onClick={() => setCurrentPage(p => p + 1)}
                                endIcon={<ExpandMore sx={{ transform: 'rotate(90deg)' }} />}
                            >
                                Next
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default Standings;