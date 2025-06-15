import { useState, Suspense, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Button,
  Container,
  useMediaQuery,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Stack,
  Divider,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Code,
  EmojiEvents,
  Leaderboard
} from '@mui/icons-material';
import { Link, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Profile from './Profile';
import Contests from './Contests';
import Problems from './Problems';
import Standings from './Standings';
import SetProblems from './SetProblems';
import DarkTheme from './DarkTheme';
import Auth from './Auth';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  color: theme.palette.text.primary
}));

const NavTabs = styled(Tabs)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0',
    backgroundColor: theme.palette.primary.main
  },
  '& .MuiTab-root': {
    minWidth: 100,
    padding: theme.spacing(1, 2),
    fontSize: '0.9rem',
    fontWeight: 500,
    '&.Mui-selected': {
      color: theme.palette.primary.main,
      fontWeight: 600
    }
  }
}));

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  minHeight: 'calc(100vh - 128px)'
}));

const AuthContainer = styled('div')({
  minHeight: '100vh',
  width: '100vw',
  padding: 0
});

const navItems = [
  { label: 'Profile', path: '/profile', icon: <AccountCircle fontSize="small" /> },
  { label: 'Contests', path: '/contests', icon: <EmojiEvents fontSize="small" /> },
  { label: 'Problems', path: '/problems', icon: <Code fontSize="small" /> },
  { label: 'Standings', path: '/standings', icon: <Leaderboard fontSize="small" /> },
  { label: 'Set Problems', path: '/set-contest', icon: <Code fontSize="small" /> }
];

function ProtectedRoute({ children }) {
  const userDetails = localStorage.getItem('user') || sessionStorage.getItem('user');

  if (!userDetails) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

function Navigation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });
  const location = useLocation();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  const currentTab = navItems.findIndex(item => item.path === location.pathname);

  const userData = JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || '{}');
  const username = userData?.user_name;

  const handleLogout = async () => {
    try {
      const response = await fetch("https://ultimate-arena.onrender.com/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }

      localStorage.removeItem("user");
      localStorage.removeItem("rememberMe");
      sessionStorage.removeItem("user");

      navigate("/auth", { replace: true });

      handleMenuClose();
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || "Error during logout",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar sx={{ px: { xs: 1, md: 3 }, py: 1 }}>
          <Typography variant="h6" sx={{
            fontSize: '1.5rem',
            fontWeight: 800,
            background: theme.palette.primary.main,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mr: 5,
            marginLeft: 2,
          }}>
            Ultimate Arena
          </Typography>

          {isMobile ? (
            <>
              <Box sx={{ flexGrow: 1 }} />
              <IconButton
                color="inherit"
                onClick={handleMenuOpen}
                sx={{
                  color: 'text.primary',
                  border: `1px solid ${theme.palette.divider}`,
                  backgroundColor: theme.palette.background.default
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                slotProps={{
                  paper: {
                    sx: {
                      minWidth: 250,
                      background: theme.palette.background.paper,
                      borderRadius: 2,
                      boxShadow: theme.shadows[6],
                      border: `1px solid ${theme.palette.divider}`
                    }
                  }
                }}
              >
                {/* User info section */}
                <MenuItem onClick={handleProfileClick} sx={{ py: 1.5 }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{
                      bgcolor: theme.palette.primary.main,
                      width: 40,
                      height: 40
                    }}>
                      {username.charAt(0)}
                    </Avatar>
                    <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                      {username}
                    </Typography>
                  </Stack>
                </MenuItem>
                <Divider sx={{ my: 1 }} />

                {/* Navigation items */}
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    component={Link}
                    to={item.path}
                    selected={location.pathname === item.path}
                    onClick={handleMenuClose}
                    sx={{
                      py: 1.5,
                      '&.Mui-selected': {
                        backgroundColor: `${theme.palette.primary.main}10`,
                        '& .MuiListItemIcon-root': {
                          color: theme.palette.primary.main
                        }
                      }
                    }}
                  >
                    <Stack direction="row" alignItems="center" gap={1.5}>
                      {item.icon}
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {item.label}
                      </Typography>
                    </Stack>
                  </MenuItem>
                ))}

                <Divider sx={{ my: 1 }} />

                {/* Logout button in menu */}
                <MenuItem
                  onClick={handleLogout}
                  sx={{ py: 1.5 }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <ExitToApp fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Log Out
                    </Typography>
                  </Stack>
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <NavTabs
                value={currentTab}
                textColor="inherit"
                sx={{ flexGrow: 0 }}
              >
                {navItems.map((item) => (
                  <Tab
                    key={item.label}
                    label={item.label}
                    component={Link}
                    to={item.path}
                    icon={item.icon}
                    iconPosition="start"
                  />
                ))}
              </NavTabs>

              <Box sx={{ flexGrow: 1 }} />

              <Stack direction="row" alignItems="center" spacing={2}>
                <Button
                  variant="text"
                  onClick={handleProfileClick}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textTransform: 'none',
                    minWidth: 'auto',
                    p: 1,
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                >
                  <Typography variant="body2" sx={{
                    fontWeight: 600,
                    lineHeight: 1.2,
                    fontSize: '1.2rem',
                    textDecoration: 'underline',
                  }}>
                    {username}
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<ExitToApp />}
                  onClick={handleLogout}
                  sx={{
                    borderRadius: 1,
                    px: 2,
                    fontWeight: 500,
                    borderWidth: 1.5
                  }}
                >
                  <Typography variant="body2" sx={{
                    fontWeight: 600,
                    lineHeight: 1.2,
                    fontSize: '1rem',
                    padding: '4px 8px',
                  }}>
                    Log Out
                  </Typography>
                </Button>
              </Stack>
            </>
          )}
        </Toolbar>
      </StyledAppBar>
      
      {/* Snackbar for logout notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuthPage = location.pathname === '/auth';
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const userDetails = localStorage.getItem('user') || sessionStorage.getItem('user');

    if (!userDetails && !isAuthPage) {
      navigate('/auth', { replace: true });
    }

    setAuthChecked(true);
  }, [isAuthPage, navigate]);

  if (!authChecked) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: DarkTheme.palette.background.default
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <>
      {/* Only render Navigation when NOT on the auth page */}
      {!isAuthPage && <Navigation />}

      {/* Use different container for auth vs main content */}
      {isAuthPage ? (
        <AuthContainer>
          <Suspense fallback={
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              background: DarkTheme.palette.background.default
            }}>
              <CircularProgress size={60} />
            </Box>
          }>
            <Routes>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </AuthContainer>
      ) : (
        <>
          <MainContainer maxWidth="xl">
            <Suspense fallback={
              <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50vh'
              }}>
                <CircularProgress size={60} />
              </Box>
            }>
              <Routes>
                {/* Protected routes */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/contests" element={
                  <ProtectedRoute>
                    <Contests />
                  </ProtectedRoute>
                } />
                <Route path="/problems" element={
                  <ProtectedRoute>
                    <Problems />
                  </ProtectedRoute>
                } />
                <Route path="/standings" element={
                  <ProtectedRoute>
                    <Standings />
                  </ProtectedRoute>
                } />
                <Route path="/set-contest" element={
                  <ProtectedRoute>
                    <SetProblems />
                  </ProtectedRoute>
                } />

                {/* Redirect root to profile */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Navigate to="/profile" replace />
                  </ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          </MainContainer>

          {/* Only show footer when not on auth page */}
          <Box sx={{
            py: 3,
            textAlign: 'center',
            borderTop: `1px solid ${DarkTheme.palette.divider}`,
            backgroundColor: 'background.default'
          }}>
            <Typography variant="body2" color="textSecondary">
              © 2025 Ultimate Arena. All rights reserved.
            </Typography>
          </Box>
        </>
      )}
    </>
  );
}

export default App;