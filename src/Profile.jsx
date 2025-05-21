import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Box,
    Avatar,
    Grid,
    Paper,
    TextField,
    Chip,
    Stack,
    LinearProgress,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    useMediaQuery,
    Slide
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
    InsertPhoto
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { BarChart } from '@mui/x-charts/BarChart';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StatCard = ({ title, value, icon, progress, color }) => (
    <Paper sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: alpha(color || '#1976d2', 0.1),
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: 3
        }
    }}>
        <Stack direction="row" alignItems="center" spacing={2}>
            <Box sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                bgcolor: color || 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
            }}>
                {icon}
            </Box>
            <Box>
                <Typography variant="h5" fontWeight={800} color={color || 'primary'}>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">{title}</Typography>
            </Box>
        </Stack>
        {progress && (
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    mt: 2,
                    height: 6,
                    borderRadius: 3,
                    bgcolor: alpha(color || '#1976d2', 0.2),
                    '& .MuiLinearProgress-bar': {
                        bgcolor: color || 'primary.main'
                    }
                }}
            />
        )}
    </Paper>
);

function Profile() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [editName, setEditName] = useState(false);
    const [displayName, setDisplayName] = useState('Sobhit Raghav');
    const [username] = useState('destroyer69');
    const [anchorEl, setAnchorEl] = useState(null);
    const [socialDialogOpen, setSocialDialogOpen] = useState(false);
    const [selectedHandle, setSelectedHandle] = useState(null);
    const [avatar, setAvatar] = useState(null);
    const [socialLinks, setSocialLinks] = useState({
        github: '',
        linkedin: '',
        website: ''
    });

    const [handles, setHandles] = useState([
        { platform: 'Codeforces', username: 'ap12345', rating: 1920, primary: true },
        { platform: 'LeetCode', username: 'destroyer69', rating: 2180, primary: false }
    ]);

    const stats = {
        participated: 41,
        won: 15,
        problemsSolved: 872
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveHandle = (platform) => {
        setHandles(prev => prev.filter(handle => handle.platform !== platform));
        setAnchorEl(null);
    };

    const handleSocialLinksSave = () => {
        setSocialDialogOpen(false);
        // Add actual save logic here
    };

    return (
        <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 3 } }}>
            <Paper elevation={3} sx={{
                p: { xs: 2, sm: 4 },
                borderRadius: 4,
                background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)} 0%, ${theme.palette.background.paper} 100%)`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: theme.shadows[6]
            }}>
                {/* Profile Header */}
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 4, mb: 4 }}>
                    <Box sx={{ position: 'relative' }}>
                        <label htmlFor="avatar-upload">
                            <Avatar sx={{
                                width: { xs: 100, sm: 140 },
                                height: { xs: 100, sm: 140 },
                                fontSize: { xs: '2.5rem', sm: '3.5rem' },
                                bgcolor: 'primary.main',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)'
                                }
                            }}>
                                {avatar ? (
                                    <img src={avatar} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : username[0].toUpperCase()}
                            </Avatar>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleAvatarUpload}
                            />
                        </label>
                        {isMobile ? null : (<IconButton sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            bgcolor: 'background.paper',
                            '&:hover': { bgcolor: 'background.default' }
                        }}>
                            <InsertPhoto fontSize="small" />
                        </IconButton>)}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            {editName ? (
                                <TextField
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    sx={{ width: 300 }}
                                    autoFocus
                                />
                            ) : (
                                <Typography variant="h1" sx={{ fontWeight: 800, letterSpacing: '-0.5px' }}>
                                    {displayName}
                                </Typography>
                            )}
                            <IconButton onClick={() => setEditName(!editName)}>
                                {editName ? <Check color="success" /> : <Edit />}
                            </IconButton>
                        </Box>

                        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
                            @{username}
                        </Typography>

                        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                            <IconButton href={socialLinks.github} target="_blank" disabled={!socialLinks.github}>
                                <GitHub />
                            </IconButton>
                            <IconButton href={socialLinks.linkedin} target="_blank" disabled={!socialLinks.linkedin}>
                                <LinkedIn />
                            </IconButton>
                            <Button
                                variant="outlined"
                                startIcon={<LinkIcon />}
                                onClick={() => setSocialDialogOpen(true)}
                                sx={{ borderRadius: 3 }}
                            >
                                Manage Socials
                            </Button>
                        </Stack>
                    </Box>
                </Box>

                {/* Stats Section */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            title="Participated"
                            value={stats.participated}
                            icon={<School sx={{ fontSize: 28 }} />}
                            color="#d500f9"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            title="Contests Won"
                            value={stats.won}
                            icon={<EmojiEvents sx={{ fontSize: 28 }} />}
                            color="#ffd700"
                        />
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <StatCard
                            title="Problems Solved"
                            value={stats.problemsSolved}
                            icon={<Code sx={{ fontSize: 28 }} />}
                            color="#00c853"
                        />
                    </Grid>
                </Grid>

                {/* Coding Handles */}
                <Paper sx={{ p: 3, borderRadius: 3, mb: 4, bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                    <Typography variant="h4" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
                        <Code sx={{ color: 'primary.main' }} /> Coding Profiles
                    </Typography>

                    <List sx={{ mb: 2 }}>
                        {handles.map((handle) => (
                            <ListItem
                                key={handle.platform}
                                secondaryAction={
                                    <IconButton onClick={(e) => {
                                        setAnchorEl(e.currentTarget);
                                        setSelectedHandle(handle);
                                    }}>
                                        <MoreVert />
                                    </IconButton>
                                }
                                sx={{
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    mb: 1,
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        boxShadow: theme.shadows[1]
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1.5,
                                                mb: 0.5,
                                                ml:1
                                            }}
                                        >
                                            <Typography
                                                fontWeight={700}
                                                fontSize={18}
                                                color="text.primary"
                                                noWrap
                                            >
                                                {handle.username}
                                            </Typography>
                                        </Box>
                                    }
                                    secondary={
                                        <Chip
                                            label={`Rating: ${handle.rating}`}
                                            size="small"
                                            sx={{
                                                mt: 0.5,
                                                fontWeight: 500,
                                                color: theme.palette.primary.main,
                                                bgcolor: alpha(theme.palette.primary.main, 0.08),
                                                borderRadius: 1,
                                                px: 0.7,
                                                height: 24,
                                            }}
                                        />
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<Add />}
                        sx={{ borderRadius: 3 }}
                    >
                        Add New Profile
                    </Button>
                </Paper>

                {/* Performance Chart */}
                <Paper
                    sx={{
                        p: { xs: 1.5, sm: 2, md: 3 },
                        borderRadius: 3,
                        mb: 4,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    }}
                >
                    <Typography variant="h4" sx={{ mb: { xs: 2, md: 3, fontWeight: 600 } }}>
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
                                        label: 'Rating Ranges'
                                    },
                                ]}
                                yAxis={[
                                    {
                                        label: 'Problems',
                                        min: 0,
                                        max: isMobile ? 200 : 250,
                                        tickMinStep: 20,
                                    },
                                ]}
                                series={[
                                    {
                                        data: isMobile
                                            ? [115, 87, 38, 69]
                                            : [15, 87, 38, 69, 20, 12, 100],
                                        color: theme.palette.primary.main,
                                        valueFormatter: (value) => `${value} Problems Solved`,
                                    },
                                ]}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    '& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel': {
                                        fill: (theme) => theme.palette.text.secondary,
                                    },
                                }}
                                slotProps={{
                                    legend: {
                                        hidden: true,
                                    },
                                    container: {
                                        sx: {
                                            '.MuiChartsAxis-line': {
                                                stroke: (theme) => theme.palette.divider,
                                            },
                                            '.MuiChartsAxis-tick': {
                                                stroke: (theme) => theme.palette.divider,
                                            },
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>
                </Paper>

                {/* Social Links Dialog */}
                <Dialog
                    open={socialDialogOpen}
                    onClose={() => setSocialDialogOpen(false)}
                    slots={{ transition: Transition }}
                >
                    <DialogTitle sx={{ bgcolor: 'background.paper' }}>Manage Social Links</DialogTitle>
                    <DialogContent sx={{ bgcolor: 'background.paper' }}>
                        <Stack spacing={2} sx={{ mt: 2, minWidth: 400 }}>
                            <TextField
                                label="GitHub URL"
                                fullWidth
                                value={socialLinks.github}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, github: e.target.value }))}
                            />
                            <TextField
                                label="LinkedIn URL"
                                fullWidth
                                value={socialLinks.linkedin}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, linkedin: e.target.value }))}
                            />
                            <TextField
                                label="Personal Website"
                                fullWidth
                                value={socialLinks.website}
                                onChange={(e) => setSocialLinks(prev => ({ ...prev, website: e.target.value }))}
                            />
                        </Stack>
                    </DialogContent>
                    <DialogActions sx={{ bgcolor: 'background.paper' }}>
                        <Button onClick={() => setSocialDialogOpen(false)}>Cancel</Button>
                        <Button variant="contained" onClick={handleSocialLinksSave}>
                            Save Changes
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Handle Menu */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={() => setAnchorEl(null)}
                >
                    <MenuItem onClick={() => setAnchorEl(null)}>Edit Profile</MenuItem>
                    <MenuItem
                        onClick={() => handleRemoveHandle(selectedHandle?.platform)}
                        sx={{ color: 'error.main' }}
                    >
                        <Delete sx={{ mr: 1 }} /> Remove
                    </MenuItem>
                </Menu>
            </Paper>
        </Container>
    );
}

export default Profile;