import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
  Snackbar,
  useTheme,
  alpha,
  IconButton,
  CircularProgress
} from '@mui/material';
import {
  ArrowRightAlt,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const AuthContainer = styled('div')(({ theme }) => ({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(circle at 10% 20%, ${theme.palette.primary.dark} 0%, ${theme.palette.background.default} 100%)`,
  position: 'fixed',
  top: 0,
  left: 0,
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: '200%',
    height: '200%',
    background: `linear-gradient(45deg, 
      ${theme.palette.primary.main} 0%, 
      ${theme.palette.secondary.main} 50%, 
      ${theme.palette.background.default} 100%)`,
    animation: 'rotate 20s linear infinite',
    opacity: 0.1,
    zIndex: 0,
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '120%',
    height: '120%',
    background: `radial-gradient(circle at 50% 50%, 
      ${alpha(theme.palette.primary.light, 0.1)} 0%, 
      transparent 60%)`,
    animation: 'pulse 8s ease-in-out infinite alternate',
    zIndex: 0,
  },
  '@keyframes rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)', opacity: 0.3 },
    '100%': { transform: 'scale(1.2)', opacity: 0.1 },
  }
}));

const Particles = styled('div')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: '100%',
  zIndex: 0,
  overflow: 'hidden',
  '& span': {
    position: 'absolute',
    display: 'block',
    width: '20px',
    height: '20px',
    background: alpha(theme.palette.primary.main, 0.15),
    borderRadius: '50%',
    animation: 'float 25s linear infinite',
    '&:nth-of-type(1)': {
      left: '25%',
      width: '80px',
      height: '80px',
      animationDelay: '0s',
      animationDuration: '18s',
    },
    '&:nth-of-type(2)': {
      left: '10%',
      width: '20px',
      height: '20px',
      animationDelay: '2s',
      animationDuration: '12s',
    },
    '&:nth-of-type(3)': {
      left: '70%',
      width: '30px',
      height: '30px',
      animationDelay: '4s',
    },
    '&:nth-of-type(4)': {
      left: '40%',
      width: '60px',
      height: '60px',
      animationDelay: '0s',
      animationDuration: '18s',
    },
    '&:nth-of-type(5)': {
      left: '65%',
      width: '20px',
      height: '20px',
      animationDelay: '0s',
    },
    '&:nth-of-type(6)': {
      left: '75%',
      width: '110px',
      height: '110px',
      animationDelay: '3s',
    },
    '&:nth-of-type(7)': {
      left: '35%',
      width: '150px',
      height: '150px',
      animationDelay: '7s',
    },
    '&:nth-of-type(8)': {
      left: '50%',
      width: '25px',
      height: '25px',
      animationDelay: '15s',
      animationDuration: '45s',
    },
    '&:nth-of-type(9)': {
      left: '20%',
      width: '15px',
      height: '15px',
      animationDelay: '2s',
      animationDuration: '35s',
    },
    '&:nth-of-type(10)': {
      left: '85%',
      width: '150px',
      height: '150px',
      animationDelay: '0s',
      animationDuration: '11s',
    },
  },
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0) rotate(0deg)',
      opacity: 1,
      borderRadius: '0',
    },
    '100%': {
      transform: 'translateY(-1000px) rotate(720deg)',
      opacity: 0,
      borderRadius: '50%',
    },
  },
}));

const AuthCard = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  padding: '2.5rem',
  borderRadius: '1.5rem',
  background: `rgba(${theme.palette.mode === 'dark' ? '25,25,25' : '255,255,255'}, 0.85)`,
  backdropFilter: 'blur(16px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
  boxShadow: `
    0 10px 40px ${alpha(theme.palette.common.black, 0.1)},
    0 2px 10px ${alpha(theme.palette.primary.main, 0.1)},
    0 4px 6px ${alpha(theme.palette.secondary.main, 0.05)}
  `,
  maxWidth: 420,
  width: '95%',
  zIndex: 1,
  margin: '0 auto',
  overflow: 'hidden',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '5px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  }
}));

const InputWrapper = styled(motion.div)(({ theme, error }) => ({
  position: 'relative',
  marginBottom: '1.5rem',
  '&:after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '2px',
    background: error ? theme.palette.error.main : theme.palette.primary.main,
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease'
  },
  '&:hover:after': {
    transform: 'scaleX(1)'
  }
}));

const InputField = styled('input')(({ theme }) => ({
  width: '100%',
  padding: '1rem 1rem 1rem 3rem',
  borderRadius: '10px',
  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
  background: alpha(theme.palette.background.paper, 0.6),
  color: theme.palette.text.primary,
  fontSize: '1rem',
  transition: 'all 0.3s ease',
  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.2)}`,
    background: alpha(theme.palette.background.paper, 0.9),
  },
  '&::placeholder': {
    color: alpha(theme.palette.text.secondary, 0.6),
    transition: 'color 0.3s ease',
  },
  '&:focus::placeholder': {
    color: alpha(theme.palette.text.secondary, 0.4),
  },
  paddingRight: '3rem',
}));

const InputIcon = styled('div')(({ theme }) => ({
  position: 'absolute',
  left: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  color: theme.palette.text.secondary,
  zIndex: 1
}));

const PasswordToggle = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: '1.2rem',
  transform: 'translateY(-50%)',
  zIndex: 1,
  color: theme.palette.text.secondary,
  padding: '4px',
}));

function Auth() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    user_name: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error',
  });

  const validateForm = () => {
    const newErrors = {};

    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      } else if (!/^[a-zA-Z ]+$/.test(formData.name)) {
        newErrors.name = 'Name can only contain letters and spaces';
      }
    }

    if (!formData.user_name.trim()) {
      newErrors.user_name = 'Username is required';
    } else if (!/^\w+$/.test(formData.user_name)) {
      newErrors.user_name = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (/\s/.test(formData.password)) {
      newErrors.password = 'Password cannot contain spaces';
    }

    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setSnackbar({
        open: true,
        message: Object.values(newErrors)[0],
        severity: 'error'
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm() || isLoading) return;

    setIsLoading(true);

    setSnackbar({
      open: true,
      message: "Processing your request...",
      severity: "info",
    });

    try {
      const endpoint = isLogin
        ? "https://ultimate-arena.onrender.com/api/auth/login"
        : "https://ultimate-arena.onrender.com/api/auth/register";

      const body = isLogin
        ? {
          user_name: formData.user_name,
          password: formData.password,
        }
        : {
          name: formData.name,
          user_name: formData.user_name,
          password: formData.password,
        };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!res.ok) {
        throw new Error(
          data.message ||
          (isLogin
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again.")
        );
      }

      const userData = data.data?.user ?? data.data?.newUser;

      if (userData) {
        const userJson = JSON.stringify(userData);

        if (rememberMe) {
          localStorage.setItem("user", userJson);
          localStorage.setItem("rememberMe", "true");
          sessionStorage.removeItem("user");
        } else {
          sessionStorage.setItem("user", userJson);
          localStorage.removeItem("user");
          localStorage.removeItem("rememberMe");
        }
      } else {
        throw new Error("User data not found in response.");
      }

      setSnackbar({
        open: true,
        message: isLogin
          ? "Successfully logged in!"
          : "Account created successfully!",
        severity: "success",
      });

      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setSnackbar({
        open: true,
        message:
          error.message ||
          (isLogin
            ? "Login failed. Please check your credentials."
            : "Registration failed. Please try again."),
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <AuthContainer>
      {/* Background particles */}
      <Particles>
        {[...Array(10)].map((_, i) => (
          <span key={crypto.randomUUID()} />
        ))}
      </Particles>

      {/* Enhanced Snackbar with animated entrance */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            '&.MuiAlert-filledError': {
              backgroundColor: theme.palette.error.main,
              color: theme.palette.error.contrastText
            },
            '&.MuiAlert-filledSuccess': {
              backgroundColor: theme.palette.success.main,
              color: theme.palette.success.contrastText
            }
          }}
        >
          {snackbar.message}
        </Alert>

      </Snackbar>

      <AuthCard
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h1" sx={{
            fontWeight: 800,
            fontSize: '2.4rem',
            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            textShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`
          }}>
            Ultimate Arena
          </Typography>
          <Typography variant="body2" sx={{
            color: 'text.secondary',
            fontSize: '1rem',
            fontWeight: 500
          }}>
            {isLogin ? 'Welcome back, competitor!' : 'Join the ultimate coding battle'}
          </Typography>
        </Box>

        {/* Enhanced tab buttons with animated underline */}
        <Box sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: isLogin ? '0%' : '50%',
            width: '50%',
            height: '3px',
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            borderRadius: '3px',
            transition: 'left 0.3s ease'
          }
        }}>
          <Button
            fullWidth
            disableElevation
            variant="text"
            onClick={() => setIsLogin(true)}
            sx={{
              borderRadius: '8px 0 0 8px',
              py: 1.2,
              fontWeight: 600,
              fontSize: '0.95rem',
              color: isLogin ? theme.palette.primary.main : theme.palette.text.secondary,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            Log In
          </Button>
          <Button
            fullWidth
            disableElevation
            variant="text"
            onClick={() => setIsLogin(false)}
            sx={{
              borderRadius: '0 8px 8px 0',
              py: 1.2,
              fontWeight: 600,
              fontSize: '0.95rem',
              color: !isLogin ? theme.palette.primary.main : theme.palette.text.secondary,
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.1)
              }
            }}
          >
            Register
          </Button>
        </Box>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode='wait'>
            {!isLogin && (
              <InputWrapper
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                error={!!errors.name}
              >
                <InputIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </InputIcon>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value
                      .replace(/[^a-zA-Z ]/g, '')
                      .replace(/\s{2,}/g, ' ')
                      .slice(0, 60);
                    setFormData({ ...formData, name: sanitizedValue });
                  }}
                  onBlur={(e) => {
                    setFormData({ ...formData, name: e.target.value.trim() });
                  }}
                  aria-label="Full Name"
                  disabled={isLoading}
                />
              </InputWrapper>
            )}
          </AnimatePresence>

          <InputWrapper
            error={!!errors.user_name}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path d="M16 16v-1a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v1" />
              </svg>
            </InputIcon>
            <InputField
              type="text"
              placeholder="Username"
              value={formData.user_name}
              onChange={(e) => {
                const sanitizedValue = e.target.value
                  .replace(/[^\w]/g, '')
                  .slice(0, 20);
                setFormData({ ...formData, user_name: sanitizedValue });
              }}
              aria-label="Username"
              disabled={isLoading}
            />
          </InputWrapper>

          <InputWrapper
            error={!!errors.password}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <InputIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </InputIcon>
            <InputField
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                const sanitizedValue = e.target.value.replace(/ /g, '');
                setFormData({ ...formData, password: sanitizedValue });
              }}
              aria-label="Password"
              disabled={isLoading}
            />
            <PasswordToggle
              onClick={handleTogglePassword}
              aria-label="toggle password visibility"
              edge="end"
              disabled={isLoading}
            >
              {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
            </PasswordToggle>
          </InputWrapper>

          <AnimatePresence mode='wait'>
            {!isLogin && (
              <InputWrapper
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                error={!!errors.confirmPassword}
              >
                <InputIcon>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    <path d="M12 16a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                </InputIcon>
                <InputField
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => {
                    const sanitizedValue = e.target.value.replace(/ /g, '');
                    setFormData({ ...formData, confirmPassword: sanitizedValue });
                  }}
                  aria-label="Confirm Password"
                  disabled={isLoading}
                />
                <PasswordToggle
                  onClick={handleToggleConfirmPassword}
                  aria-label="toggle confirm password visibility"
                  edge="end"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                </PasswordToggle>
              </InputWrapper>
            )}
          </AnimatePresence>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
            flexWrap: 'wrap',
            gap: 1
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  size="small"
                  color="primary"
                  sx={{
                    '&.Mui-checked': {
                      color: theme.palette.primary.main,
                    }
                  }}
                  disabled={isLoading}
                />
              }
              label="Remember me"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '0.875rem',
                  fontWeight: 600
                }
              }}
            />
            <Link
              component={RouterLink}
              to="/forgot-password"
              sx={{
                fontSize: '0.875rem',
                color: theme.palette.primary.main,
                fontWeight: 500,
                textDecoration: 'none',
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  width: '0%',
                  height: '2px',
                  backgroundColor: theme.palette.primary.main,
                  transition: 'width 0.3s ease'
                },
                '&:hover:after': {
                  width: '100%'
                },
                pointerEvents: isLoading ? 'none' : 'auto',
                opacity: isLoading ? 0.7 : 1
              }}
            >
              Forgot Password?
            </Link>
          </Box>

          <motion.div
            whileHover={isLoading ? {} : { scale: 1.02 }}
            whileTap={isLoading ? {} : { scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              fullWidth
              type="submit"
              disabled={isLoading}
              sx={{
                py: '0.6rem',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '1.05rem',
                background: isLoading
                  ? alpha(theme.palette.primary.main, 0.7)
                  : `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                color: theme.palette.getContrastText(theme.palette.primary.main),
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  left: '-50%',
                  width: '200%',
                  height: '200%',
                  background: `linear-gradient(45deg, 
                    transparent 25%, 
                    ${alpha(theme.palette.common.white, 0.1)} 50%, 
                    transparent 75%)`,
                  transform: 'rotate(45deg)',
                  transition: 'all 0.5s ease',
                  opacity: isLoading ? 0 : 1
                },
                '&:hover:after': {
                  left: isLoading ? '-50%' : '150%'
                }
              }}
            >
              {isLoading ? (
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%'
                }}>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'white',
                      mr: 2,
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <Typography>
                    {isLogin ? 'Logging in...' : 'Creating account...'}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {isLogin ? 'Enter Arena' : 'Begin Journey'}
                  <ArrowRightAlt sx={{ ml: 1 }} />
                </Box>
              )}
            </Button>
          </motion.div>
        </form>
      </AuthCard>
    </AuthContainer>
  );
}

export default Auth;