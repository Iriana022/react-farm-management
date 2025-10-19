import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#FFA000' },
    background: { default: '#F5F5F5' },
  },
  typography: { fontFamily: 'Roboto, sans-serif' },
});

export default theme;