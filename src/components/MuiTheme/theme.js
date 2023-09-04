import { createTheme } from '@mui/material';

const lightTheme = createTheme({
    
    palette: {
        mode: 'light',
        primary: {
            main: '#2196f3',
        },
        secondary: {
            main: '#f44336',
        },
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#bb86fc',
        },
        secondary: {
            main: '#03dac6',
        },
    },
});

export { darkTheme, lightTheme }