import { createTheme } from '@mui/material/styles';

const Theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#FF6B35' },
        secondary: { main: '#1a1919' },
        background: {
            default: '#121212',
            paper: '#1E1E1E'
        },
        status: {
          ongoing: '#00BCD4',
          completed: '#4CAF50',
          upcoming: '#FFC107',
          error: '#F44336'
        }
    },
    typography: {
        fontFamily: 'Lato, Arial, sans-serif',
        h1: { fontSize: '2.5rem', fontWeight: 700 },
        h2: { fontSize: '2rem', fontWeight: 600 },
        h3: { fontSize: '1.75rem' },
        h4: { fontSize: '1.5rem' },
        h5: { fontSize: '1.25rem' },
        h6: { fontSize: '1.1rem' },
        body1: { fontSize: '1rem' }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#1A1A1A',
                    backgroundImage: 'none',
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    '& .MuiTableCell-root': {
                        padding: { xs: '8px', sm: '12px' },
                        fontSize: { xs: '0.8rem', sm: '0.9rem' }
                    }
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontWeight: 600
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    minHeight: '48px',
                    textTransform: 'none',
                    '&.Mui-selected': {
                        fontWeight: 700
                    }
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    borderRadius: '4px'
                }
            }
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    }
});

export default Theme;