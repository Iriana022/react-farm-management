import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';

import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';

import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import BudgetPage from './pages/BudgetPage';
import LotsPage from './pages/LotsPage';
import Planning from './pages/Planning';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Top Bar */}
        <TopBar />

        {/* Layout global */}
        <Box sx={{ display: 'flex', pt: '64px', minHeight: '100vh' }}>
          {/* Sidebar avec largeur fixe */}
          <Box sx={{ width: 240, flexShrink: 0 }}>
            <Sidebar />
          </Box>

          {/* Contenu principal */}
          <Box sx={{ flex: 1, p: 3, overflowY: 'auto' }}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/budget" element={<BudgetPage />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/lots" element={<LotsPage />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}


export default App;
