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
  Stack
} from '@mui/material';
import {
  Menu as MenuIcon,
  AccountCircle,
  ExitToApp,
  Code,
  EmojiEvents,
  Leaderboard
} from '@mui/icons-material';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';

import Profile from './Profile';
import Contests from './Contests';
import Problems from './Problems';
import Standings from './Standings';
import SetProblems from './SetProblems';
import DarkTheme from './DarkTheme';
import Auth from './Auth';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
}));

const NavTabs = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 3,
    borderRadius: '2px 2px 0 0'
  },
  '& .MuiTab-root': {
    minWidth: 120,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: theme.palette.primary.main
    }
  }
}));

const MainContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(6),
  minHeight: 'calc(100vh - 128px)'
}));

// Auth page container - full height with no padding
const AuthContainer = styled('div')({
  minHeight: '100vh',
  width: '100vw',
  padding: 0
});

const navItems = [
  { label: 'Profile', path: '/', icon: <AccountCircle /> },
  { label: 'Contests', path: '/contests', icon: <EmojiEvents /> },
  { label: 'Problems', path: '/problems', icon: <Code /> },
  { label: 'Standings', path: '/standings', icon: <Leaderboard /> },
  { label: 'Set Problems', path: '/set-contest', icon: <Code /> }
];

function Navigation() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const currentTab = navItems.findIndex(item => item.path === location.pathname);

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ px: { xs: 2, md: 4 }, gap: 2 }}>
        <Typography variant="h6" sx={{ mr: 2, fontWeight: 800 }}>
          Ultimate Arena
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              color="inherit"
              onClick={handleMenuOpen}
              sx={{ ml: 'auto' }}
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
                    minWidth: 200,
                    background: theme.palette.background.paper
                  }
                }
              }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.label}
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                  onClick={handleMenuClose}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: `${theme.palette.primary.main}20`
                    }
                  }}
                >
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    {item.icon}
                    {item.label}
                  </Stack>
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <NavTabs
            value={currentTab}
            textColor="inherit"
            sx={{ flexGrow: 1 }}
          >
            {navItems.map((item) => (
              <Tab
                key={item.label}
                label={item.label}
                component={Link}
                to={item.path}
                icon={item.icon}
                iconPosition="start"
                sx={{
                  '&.Mui-selected': {
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }
                }}
              />
            ))}
          </NavTabs>
        )}

        <Button
          variant="contained"
          color="primary"
          startIcon={<ExitToApp />}
          component={Link}
          to="/auth"
          sx={{
            ml: 'auto',
            borderRadius: 2,
            px: 2,
            py: 1,
            fontWeight: 600,
            boxShadow: theme.shadows[2]
          }}
        >
          Log Out
        </Button>
      </Toolbar>
    </StyledAppBar>
  );
}

function App() {
  // Get current location to determine if we're on the auth page
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {/* Only render Navigation when NOT on the auth page */}
      {!isAuthPage && <Navigation />}

      {/* Use different container for auth vs main content */}
      {isAuthPage ? (
        <AuthContainer>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/auth" element={<Auth />} />
            </Routes>
          </Suspense>
        </AuthContainer>
      ) : (
        <>
          <MainContainer maxWidth="xl">
            <Suspense fallback={<div>Loading...</div>}>
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
          <Box sx={{ py: 3, textAlign: 'center', borderTop: `1px solid ${DarkTheme.palette.divider}` }}>
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