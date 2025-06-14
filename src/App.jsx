import { useState, Suspense } from 'react';
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
  Avatar
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Code,
  EmojiEvents,
  Leaderboard
} from '@mui/icons-material';
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
  { label: 'Profile', path: '/', icon: <AccountCircle fontSize="small" /> },
  { label: 'Contests', path: '/contests', icon: <EmojiEvents fontSize="small" /> },
  { label: 'Problems', path: '/problems', icon: <Code fontSize="small" /> },
  { label: 'Standings', path: '/standings', icon: <Leaderboard fontSize="small" /> },
  { label: 'Set Problems', path: '/set-contest', icon: <Code fontSize="small" /> }
];

function Navigation() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileClick = () => {
    navigate('/');
    handleMenuClose();
  };

  const currentTab = navItems.findIndex(item => item.path === location.pathname);

  const user = {
    username: "destroyer69",
  };

  return (
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
                    {user.username.charAt(0)}
                  </Avatar>
                  <Typography variant="body1" sx={{ fontSize: '1.2rem', fontWeight: 600 }}>
                    {user.username}
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
                onClick={() => navigate('/auth')}
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
                  {user.username}
                </Typography>
              </Button>

              <Button
                variant="outlined"
                color="primary"
                startIcon={<ExitToApp />}
                onClick={() => navigate('/auth')}
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
  );
}

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

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
              <Typography variant="h6">Loading...</Typography>
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
                <Typography variant="h6">Loading content...</Typography>
              </Box>
            }>
              <Routes>
                <Route path="/" element={<Profile />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/contests" element={<Contests />} />
                <Route path="/problems" element={<Problems />} />
                <Route path="/standings" element={<Standings />} />
                <Route path="/set-contest" element={<SetProblems />} />
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