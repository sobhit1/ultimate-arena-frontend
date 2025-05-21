import React, { useState, forwardRef, useEffect } from 'react';
import {
    Container,
    Typography,
    Button,
    IconButton,
    Box,
    Avatar,
    Grid,
    Paper,
    TextField,
    Stack,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    Snackbar,
    Alert,
    Slide,
    Divider,
    Tooltip,
    Fade
} from '@mui/material';
import {
    Edit,
    Add,
    Delete,
    Check,
    GitHub,
    LinkedIn,
    Code,
    EmojiEvents,
    School,
    MoreVert,
    Link as LinkIcon,
    InsertPhoto,
    Visibility
} from '@mui/icons-material';
import { useTheme, alpha, styled } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

// Transition component for Dialog
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// Styled components for better UI
const GlassCard = styled(Paper)(({ theme, color }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius * 3,
    background: `linear-gradient(135deg, ${alpha(color || theme.palette.primary.main, 0.12)} 0%, ${alpha(color || theme.palette.primary.main, 0.05)} 100%)`,
    backdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.08)}`,
    border: `1px solid ${alpha(color || theme.palette.primary.main, 0.1)}`,
    '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: `0 8px 25px 0 ${alpha(theme.palette.common.black, 0.12)}`,
    }
}));

const AnimatedIconButton = styled(IconButton)(({ theme }) => ({
    transition: 'all 0.2s ease',
    '&:hover': {
        transform: 'scale(1.1)',
        backgroundColor: alpha(theme.palette.primary.main, 0.1)
    }
}));

const GradientButton = styled(Button)(({ theme, startcolor, endcolor }) => ({
    background: `linear-gradient(45deg, ${startcolor || theme.palette.primary.main} 0%, ${endcolor || theme.palette.primary.light} 100%)`,
    borderRadius: theme.shape.borderRadius * 3,
    color: theme.palette.common.white,
    padding: '8px 24px',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    boxShadow: `0 4px 10px ${alpha(startcolor || theme.palette.primary.main, 0.4)}`,
    '&:hover': {
        boxShadow: `0 6px 15px ${alpha(startcolor || theme.palette.primary.main, 0.6)}`,
        transform: 'translateY(-2px)'
    }
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.25)}`,
    border: `4px solid ${theme.palette.background.paper}`,
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: `0 12px 20px ${alpha(theme.palette.primary.main, 0.35)}`
    }
}));

const StatCard = ({ title, value, icon, progress, color }) => {
    const theme = useTheme();

    return (
        <GlassCard color={color} sx={{ height: '100%' }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <Box sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${color || theme.palette.primary.main} 0%, ${alpha(color || theme.palette.primary.light, 0.8)} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: `0 4px 10px ${alpha(color || theme.palette.primary.main, 0.4)}`
                }}>
                    {React.cloneElement(icon, { sx: { fontSize: 28 } })}
                </Box>
                <Box>
                    <Typography variant="h4" fontWeight={800} color={color} sx={{
                        backgroundImage: `linear-gradient(45deg, ${color} 30%, ${alpha(color, 0.7)} 90%)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {value}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" fontWeight={500}>{title}</Typography>
                </Box>
            </Stack>
        </GlassCard>
    );
};

function Profile() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    const [editName, setEditName] = useState(false);
    const [displayName, setDisplayName] = useState('Sobhit Raghav');
    const [username] = useState('destroyer69');
    const [anchorEl, setAnchorEl] = useState(null);
    const [socialDialogOpen, setSocialDialogOpen] = useState(false);
    const [selectedHandle, setSelectedHandle] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [socialLinks, setSocialLinks] = useState({
        github: '',
        linkedin: ''
    });
    const [codeforcesDialogOpen, setCodeforcesDialogOpen] = useState(false);
    const [codeforcesUsername, setCodeforcesUsername] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
    const [profileHovered, setProfileHovered] = useState(false);

    const [handles, setHandles] = useState([
        { username: 'ap12345', rating: 1920 },
        { username: 'destroyer69', rating: 2180 }
    ]);

    const stats = {
        participated: 41,
        won: 15,
        problemsSolved: 872
    };

    // Animation effect for chart
    const [chartAnimated, setChartAnimated] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setChartAnimated(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    const handleAvatarUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCodeforcesProfile = async () => {
        const trimmedUsername = codeforcesUsername.trim();

        // Regex to validate: only letters, digits, underscores, hyphens; length between 3 and 20
        const isValid = /^[a-zA-Z0-9_-]{3,20}$/.test(trimmedUsername);

        if (!isValid) {
            setSnackbar({
                open: true,
                message: 'Please enter a valid Codeforces username (3-20 chars, letters, digits, _ or - only)',
                severity: 'error'
            });
            return;
        }

        try {
            const response = await fetch(`https://codeforces.com/api/user.info?handles=${trimmedUsername}`);
            const data = await response.json();

            if (data.status === 'OK') {
                const user = data.result[0];
                setHandles(prev => [...prev, {
                    username: trimmedUsername,
                    rating: user.rating || 0
                }]);
                setSnackbar({ open: true, message: 'Profile added successfully!', severity: 'success' });
                setCodeforcesDialogOpen(false);
                setCodeforcesUsername('');
            } else {
                setSnackbar({ open: true, message: 'User not found on Codeforces', severity: 'error' });
            }
        } catch (error) {
            console.error('Error fetching Codeforces profile:', error);
            setSnackbar({ open: true, message: 'Error fetching Codeforces profile', severity: 'error' });
        }
    };

    const getRatingColor = (rating) => {
        if (rating >= 2400) return '#ff0000';
        if (rating >= 2300) return '#ff8c00';
        if (rating >= 2100) return '#ff8c00';
        if (rating >= 1900) return '#aa00aa';
        if (rating >= 1600) return '#0000ff';
        if (rating >= 1400) return '#03a89e';
        if (rating >= 1200) return '#008000';
        return '#808080';
    };

    const getRatingTitle = (rating) => {
        if (rating >= 3000) return 'Legendary Grandmaster';
        if (rating >= 2600) return 'International Grandmaster';
        if (rating >= 2400) return 'Grandmaster';
        if (rating >= 2300) return 'International Master';
        if (rating >= 2100) return 'Master';
        if (rating >= 1900) return 'Candidate Master';
        if (rating >= 1600) return 'Expert';
        if (rating >= 1400) return 'Specialist';
        if (rating >= 1200) return 'Pupil';
        return 'Newbie';
    };

    const handleRemoveHandle = (username) => {
        setHandles(prev => prev.filter(handle => handle.username !== username));
        setAnchorEl(null);
    };

    // Update the handleSocialLinksSave function with validation checks
    const handleSocialLinksSave = async () => {
        const errors = [];
        let processedGithub = socialLinks.github.trim();
        let processedLinkedin = socialLinks.linkedin.trim();

        if (processedGithub) {
            processedGithub = processedGithub.replace(/\/+$/, '');
            const githubPattern = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z\d](?:[a-zA-Z\d-]{0,37}[a-zA-Z\d])?$/;
            if (!githubPattern.test(processedGithub)) {
                errors.push('Invalid GitHub URL format. Example: https://github.com/username');
            }
        }

        if (processedLinkedin) {
            const linkedinPattern = /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;
            if (!linkedinPattern.test(processedLinkedin)) {
                errors.push('Invalid LinkedIn URL format. Example: https://linkedin.com/in/username');
            }
        }

        if (errors.length > 0) {
            setSnackbar({
                open: true,
                message: errors.join(' '),
                severity: 'error'
            });
            return;
        }

        setSocialLinks({
            github: processedGithub,
            linkedin: processedLinkedin
        });

        setSocialDialogOpen(false);
        setSnackbar({ open: true, message: 'Social links updated successfully!', severity: 'success' });
    };

    const handleMenuOpen = (event, handle) => {
        setAnchorEl(event.currentTarget);
        setSelectedHandle(handle);
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 3, sm: 4, md: 5 } }}>
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

            <Paper elevation={0} sx={{
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 0.8)} 50%, ${alpha(theme.palette.primary.light, 0.05)} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                boxShadow: `0 8px 32px 0 ${alpha(theme.palette.common.black, 0.1)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`
            }}>
                {/* Profile Header */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: 4,
                    mb: 5,
                    alignItems: isMobile ? 'center' : 'flex-start',
                    textAlign: isMobile ? 'center' : 'left'
                }}>
                    <Box
                        sx={{
                            position: 'relative',
                            onMouseEnter: () => setProfileHovered(true),
                            onMouseLeave: () => setProfileHovered(false)
                        }}
                        onMouseEnter={() => setProfileHovered(true)}
                        onMouseLeave={() => setProfileHovered(false)}
                    >
                        <label htmlFor="avatar-upload">
                            <ProfileAvatar sx={{
                                width: { xs: 120, sm: 150, md: 180 },
                                height: { xs: 120, sm: 150, md: 180 },
                                fontSize: { xs: '3rem', sm: '4rem', md: '5rem' },
                                background: avatar ? 'transparent' : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                cursor: 'pointer'
                            }}>
                                {avatar ? (
                                    <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : username[0].toUpperCase()}
                            </ProfileAvatar>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarUpload}
                            />
                        </label>
                        <Fade in={profileHovered}>
                            <Box sx={{
                                position: 'absolute',
                                bottom: 5,
                                right: 5,
                                backgroundColor: alpha(theme.palette.background.paper, 0.9),
                                borderRadius: '50%',
                                padding: 0.5,
                                boxShadow: theme.shadows[2],
                                zIndex: 1
                            }}>
                                <Tooltip title="Change profile picture">
                                    <IconButton size="small">
                                        <InsertPhoto fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Fade>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2,
                            mb: 1,
                            justifyContent: isMobile ? 'center' : 'flex-start'
                        }}>
                            {editName ? (
                                <TextField
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{
                                        width: 300,
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 2,
                                            '&.Mui-focused fieldset': {
                                                borderColor: theme.palette.primary.main,
                                                borderWidth: 2
                                            }
                                        }
                                    }}
                                    autoFocus
                                />
                            ) : (
                                <Typography
                                    variant="h3"
                                    sx={{
                                        fontWeight: 800,
                                        letterSpacing: '-0.5px',
                                        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 50%, ${theme.palette.primary.light} 100%)`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                >
                                    {displayName}
                                </Typography>
                            )}
                            <AnimatedIconButton
                                onClick={() => setEditName(!editName)}
                                sx={{
                                    bgcolor: editName ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.primary.main, 0.1),
                                    color: editName ? theme.palette.success.main : theme.palette.primary.main
                                }}
                            >
                                {editName ? <Check /> : <Edit />}
                            </AnimatedIconButton>
                        </Box>

                        <Typography
                            variant="h5"
                            color="text.secondary"
                            sx={{
                                mb: 3,
                                fontWeight: 500,
                                opacity: 0.9
                            }}
                        >
                            @{username}
                        </Typography>

                        <Stack
                            direction={isSmall ? 'column' : 'row'}
                            spacing={2}
                            sx={{
                                alignItems: isSmall ? 'center' : 'flex-start',
                                justifyContent: isMobile ? 'center' : 'flex-start'
                            }}
                        >
                            <Tooltip title={socialLinks.github ? "Visit GitHub Profile" : "Add GitHub Profile"}>
                                <IconButton href={socialLinks.github} target="_blank" disabled={!socialLinks.github}>
                                    <GitHub />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={socialLinks.linkedin ? "Visit LinkedIn Profile" : "Add LinkedIn Profile"}>
                                <AnimatedIconButton
                                    href={socialLinks.linkedin}
                                    target="_blank"
                                    disabled={!socialLinks.linkedin}
                                    sx={{
                                        bgcolor: alpha('#0077b5', 0.1),
                                        color: '#0077b5',
                                        '&:hover': {
                                            bgcolor: alpha('#0077b5', 0.2)
                                        },
                                        '&.Mui-disabled': {
                                            bgcolor: alpha('#0077b5', 0.05),
                                            color: alpha('#0077b5', 0.3)
                                        }
                                    }}
                                >
                                    <LinkedIn />
                                </AnimatedIconButton>
                            </Tooltip>
                            <GradientButton
                                variant="contained"
                                disableElevation
                                startIcon={<LinkIcon />}
                                onClick={() => setSocialDialogOpen(true)}
                                startcolor={theme.palette.primary.main}
                                endcolor={theme.palette.primary.light}
                            >
                                Manage Social Links
                            </GradientButton>
                        </Stack>
                    </Box>
                </Box>

                {/* Stats Section */}
                <Grid container spacing={3} sx={{ mb: 5 }}>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Contests Participated"
                            value={stats.participated}
                            icon={<School />}
                            color="#9c27b0"
                            progress={80}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Contests Won"
                            value={stats.won}
                            icon={<EmojiEvents />}
                            color="#ff9800"
                            progress={stats.won / stats.participated * 100}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <StatCard
                            title="Problems Solved"
                            value={stats.problemsSolved}
                            icon={<Code />}
                            color="#4caf50"
                            progress={87}
                        />
                    </Grid>
                </Grid>

                {/* Coding Profiles Section */}
                <GlassCard
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 4,
                        mb: 5,
                        bgcolor: alpha(theme.palette.primary.main, 0.03)
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 3,
                        flexDirection: isSmall ? 'column' : 'row',
                        gap: isSmall ? 2 : 0
                    }}>
                        <Typography
                            variant="h4"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                fontWeight: 700,
                                color: theme.palette.primary.main
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 40,
                                    height: 40,
                                    borderRadius: 2,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                                    boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`
                                }}
                            >
                                <Code sx={{ color: 'white' }} />
                            </Box>
                            CodeForces Profiles
                        </Typography>
                        <GradientButton
                            variant="contained"
                            disableElevation
                            startIcon={<Add />}
                            onClick={() => setCodeforcesDialogOpen(true)}
                            startcolor={theme.palette.primary.main}
                            endcolor={theme.palette.primary.light}
                        >
                            Add New Profile
                        </GradientButton>
                    </Box>

                    <Grid container spacing={3}>
                        {handles.map((handle, index) => (
                            <Grid item xs={12} sm={6} md={4} key={handle.username}>
                                <Paper sx={{
                                    p: 3,
                                    borderRadius: 3,
                                    position: 'relative',
                                    background: `linear-gradient(135deg, ${alpha(getRatingColor(handle.rating), 0.15)} 0%, ${alpha(getRatingColor(handle.rating), 0.05)} 100%)`,
                                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                                    border: `1px solid ${alpha(getRatingColor(handle.rating), 0.2)}`,
                                    boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.05)}`,
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: `0 8px 25px 0 ${alpha(theme.palette.common.black, 0.08)}`,
                                        '& .handle-actions': {
                                            opacity: 1
                                        }
                                    },
                                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                                    '@keyframes fadeIn': {
                                        '0%': {
                                            opacity: 0,
                                            transform: 'translateY(20px)'
                                        },
                                        '100%': {
                                            opacity: 1,
                                            transform: 'translateY(0)'
                                        }
                                    }
                                }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <Box>
                                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                                <Typography
                                                    variant="h6"
                                                    sx={{
                                                        fontWeight: 700,
                                                        color: getRatingColor(handle.rating)
                                                    }}
                                                >
                                                    {handle.username}
                                                </Typography>
                                                <Tooltip title="View Profile" placement="top">
                                                    <AnimatedIconButton
                                                        size="small"
                                                        href={`https://codeforces.com/profile/${handle.username}`}
                                                        target="_blank"
                                                        sx={{
                                                            color: getRatingColor(handle.rating),
                                                            bgcolor: alpha(getRatingColor(handle.rating), 0.1),
                                                            width: 24,
                                                            height: 24
                                                        }}
                                                    >
                                                        <Visibility fontSize="small" />
                                                    </AnimatedIconButton>
                                                </Tooltip>
                                            </Stack>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: 'text.secondary',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 0.5
                                                }}
                                            >
                                                <Box component="span" fontWeight={500}>Rating:</Box>
                                                <Box component="span" sx={{
                                                    color: getRatingColor(handle.rating),
                                                    fontWeight: 600
                                                }}>
                                                    {handle.rating}
                                                </Box>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    mt: 0.5,
                                                    color: getRatingColor(handle.rating),
                                                    fontWeight: 500,
                                                    opacity: 0.9,
                                                    bgcolor: alpha(getRatingColor(handle.rating), 0.1),
                                                    display: 'inline-block',
                                                    px: 1,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    fontSize: '0.75rem'
                                                }}
                                            >
                                                {getRatingTitle(handle.rating)}
                                            </Typography>
                                        </Box>
                                        <Box className="handle-actions" sx={{ opacity: { xs: 1, md: 0 }, transition: 'opacity 0.2s ease' }}>
                                            <IconButton
                                                onClick={(event) => handleMenuOpen(event, handle)}
                                                sx={{
                                                    color: alpha(getRatingColor(handle.rating), 0.7),
                                                    '&:hover': {
                                                        bgcolor: alpha(getRatingColor(handle.rating), 0.1)
                                                    }
                                                }}
                                                size="small"
                                            >
                                                <MoreVert />
                                            </IconButton>
                                        </Box>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </GlassCard>

                {/* Add Codeforces Dialog */}
                <Dialog
                    open={codeforcesDialogOpen}
                    onClose={() => setCodeforcesDialogOpen(false)}
                    TransitionComponent={Transition}
                    PaperProps={{
                        elevation: 5,
                        sx: { borderRadius: 3 }
                    }}
                >
                    <DialogTitle sx={{
                        pb: 1,
                        fontWeight: 700,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`
                    }}>
                        Add Codeforces Profile
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3, px: { xs: 2, sm: 3 }, pb: 1, minWidth: { xs: 280, sm: 400 } }}>
                        <TextField
                            fullWidth
                            label="Codeforces Username"
                            value={codeforcesUsername}
                            onChange={(e) => setCodeforcesUsername(e.target.value.replace(/[^\w-]/g, ''))}
                            inputProps={{
                                pattern: "^[a-zA-Z0-9_-]{3,20}$",
                                title: "Only letters, numbers, and underscores allowed"
                            }}
                            helperText="Enter your Codeforces username (letters, numbers, and underscores only)"
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2,
                                    '&.Mui-focused fieldset': {
                                        borderColor: theme.palette.primary.main,
                                        borderWidth: 2
                                    }
                                }
                            }}
                        />
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button
                            onClick={() => setCodeforcesDialogOpen(false)}
                            sx={{
                                borderRadius: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                textTransform: 'none'
                            }}>
                            Cancel
                        </Button>
                        <GradientButton
                            variant="contained"
                            disableElevation
                            onClick={handleAddCodeforcesProfile}
                            disabled={!codeforcesUsername}
                            sx={{ borderRadius: 2 }}
                            startcolor={theme.palette.primary.main}
                            endcolor={theme.palette.primary.light}
                        >
                            Add Profile
                        </GradientButton>
                    </DialogActions>
                </Dialog>

                {/* Performance Chart */}
                <GlassCard
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        borderRadius: 4,
                        mb: 4,
                        bgcolor: alpha(theme.palette.primary.main, 0.03),
                        overflow: 'hidden'
                    }}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            mb: 3,
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                            color: theme.palette.primary.main
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
                                boxShadow: `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`
                            }}
                        >
                            <EmojiEvents sx={{ color: 'white' }} />
                        </Box>
                        Rating Progress
                    </Typography>
                    <Box
                        sx={{
                            width: '100%',
                            height: { xs: 250, sm: 300, md: 400 },
                            position: 'relative',
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            pb: 1,
                            opacity: chartAnimated ? 1 : 0,
                            transform: chartAnimated ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'opacity 0.5s ease, transform 0.5s ease'
                        }}
                    >
                        <Box sx={{ minWidth: 500, width: '100%', height: '100%' }}>
                            <BarChart
                                xAxis={[
                                    {
                                        scaleType: 'band',
                                        data: isMobile
                                            ? ['800-1400', '1500-2100', '2200-2800', '2900-3500']
                                            : ['800-1100', '1200-1500', '1600-1900', '2000-2300', '2400-2700', '2800-3100', '3200-3500'],
                                        tickLabelStyle: {
                                            fontSize: 12,
                                            color: theme.palette.text.secondary,
                                            fontWeight: 500
                                        },
                                        label: 'Rating Range',
                                        labelStyle: {
                                            fontSize: 14,
                                            color: theme.palette.text.primary,
                                            fontWeight: 600
                                        }
                                    },
                                ]}
                                yAxis={[
                                    {
                                        label: 'Problems Solved',
                                        min: 0,
                                        max: isMobile ? 200 : 250,
                                        tickMinStep: 20,
                                        tickLabelStyle: {
                                            fontSize: 12,
                                            color: theme.palette.text.secondary,
                                            fontWeight: 500
                                        },
                                        labelStyle: {
                                            fontSize: 14,
                                            color: theme.palette.text.primary,
                                            fontWeight: 600
                                        }
                                    },
                                ]}
                                series={[
                                    {
                                        data: isMobile
                                            ? [115, 87, 38, 69]
                                            : [15, 87, 38, 69, 20, 12, 100],
                                        color: theme.palette.primary.main,
                                        valueFormatter: (value) => `${value} Problems`,
                                        highlightScope: {
                                            highlighted: 'item',
                                            faded: 'global'
                                        },
                                        label: 'Problems Solved'
                                    },
                                ]}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
                                        fill: theme.palette.text.secondary,
                                    },
                                    '& .MuiBarElement-root': {
                                        fill: `url(#barGradient)`,
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            filter: 'brightness(1.1)'
                                        }
                                    },
                                    '.MuiChartsAxis-line': {
                                        stroke: theme.palette.divider
                                    },
                                    '.MuiChartsAxis-tick': {
                                        stroke: theme.palette.divider
                                    },
                                }}
                                margin={{
                                    left: 60,
                                    right: 20,
                                    top: 20,
                                    bottom: 40
                                }}
                                slotProps={{
                                    legend: {
                                        hidden: true,
                                    }
                                }}
                            >
                                <defs>
                                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={theme.palette.primary.light} />
                                        <stop offset="100%" stopColor={theme.palette.primary.main} />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </Box>
                    </Box>
                </GlassCard>

                {/* Social Links Dialog */}
                <Dialog
                    open={socialDialogOpen}
                    onClose={() => setSocialDialogOpen(false)}
                    TransitionComponent={Transition}
                    PaperProps={{
                        elevation: 5,
                        sx: { borderRadius: 3 }
                    }}
                >
                    <DialogTitle sx={{
                        pb: 1,
                        fontWeight: 700,
                        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}`
                    }}>
                        Manage Social Links
                    </DialogTitle>
                    <DialogContent sx={{ pt: 3, px: { xs: 2, sm: 3 }, minWidth: { xs: 280, sm: 400 } }}>
                        <Stack spacing={3} sx={{ mt: 2 }}>
                            <TextField
                                label="GitHub URL"
                                fullWidth
                                value={socialLinks.github}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, github: e.target.value }))}
                                variant="outlined"
                                placeholder="https://github.com/username"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#24292e',
                                            borderWidth: 2
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#24292e'
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <Box sx={{
                                            color: '#24292e',
                                            mr: 1,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <GitHub fontSize="small" />
                                        </Box>
                                    )
                                }}
                            />
                            <TextField
                                label="LinkedIn URL"
                                fullWidth
                                value={socialLinks.linkedin}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                                variant="outlined"
                                placeholder="https://linkedin.com/in/username"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 2,
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#0077b5',
                                            borderWidth: 2
                                        }
                                    },
                                    '& .MuiInputLabel-root.Mui-focused': {
                                        color: '#0077b5'
                                    }
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <Box sx={{
                                            color: '#0077b5',
                                            mr: 1,
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}>
                                            <LinkedIn fontSize="small" />
                                        </Box>
                                    )
                                }}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ px: 3, py: 2 }}>
                        <Button
                            onClick={() => setSocialDialogOpen(false)}
                            sx={{
                                borderRadius: 2,
                                color: theme.palette.text.secondary,
                                fontWeight: 600,
                                textTransform: 'none'
                            }}
                        >
                            Cancel
                        </Button>
                        <GradientButton
                            variant="contained"
                            disableElevation
                            onClick={handleSocialLinksSave}
                            startcolor={theme.palette.primary.main}
                            endcolor={theme.palette.primary.light}
                            sx={{ borderRadius: 2 }}
                        >
                            Save Changes
                        </GradientButton>
                    </DialogActions>
                </Dialog>

                {/* Handle Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                    PaperProps={{
                        elevation: 3,
                        sx: {
                            mt: 1.5,
                            borderRadius: 2,
                            minWidth: 180,
                            boxShadow: `0 4px 20px 0 ${alpha(theme.palette.common.black, 0.1)}`,
                            '& .MuiMenuItem-root': {
                                px: 2,
                                py: 1.2,
                                borderRadius: 1,
                                mx: 0.5,
                                my: 0.2,
                                fontSize: '0.95rem'
                            }
                        }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={() => {
                        window.open(`https://codeforces.com/profile/${selectedHandle?.username}`, '_blank');
                        setAnchorEl(null);
                    }}>
                        <Visibility sx={{ mr: 1, fontSize: 18 }} /> View Profile
                    </MenuItem>
                    <Divider sx={{ my: 0.5 }} />
                    <MenuItem
                        onClick={() => handleRemoveHandle(selectedHandle?.username)}
                        sx={{
                            color: theme.palette.error.main,
                            '&:hover': {
                                bgcolor: alpha(theme.palette.error.main, 0.1)
                            }
                        }}
                    >
                        <Delete sx={{ mr: 1, fontSize: 18 }} /> Remove
                    </MenuItem>
                </Menu>
            </Paper>
        </Container>
    );
}

export default Profile;