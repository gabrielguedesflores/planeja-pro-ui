import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Despesas from '../pages/Despesas';
import RoutesPaths from '../types';
import Login from '../pages/Login';
import GlobalStyle from '../assets/GlobalStyle';
import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { AppBar, Sidebar } from '../components';
import { useAuthContext } from '../contexts';
import Perfil from '../pages/Perfil';

export default function AppRoutes() {
  const { token } = useAuthContext();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  if (!token) {
    return (
      <ThemeProvider theme={GlobalStyle}>
        <Routes>
          <Route path={RoutesPaths.login} element={<Login />} />
          <Route path="*" element={<Navigate to={RoutesPaths.login} replace />} />
        </Routes>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={GlobalStyle}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} toggleDrawer={toggleDrawer} />
        <Sidebar open={open} toggleDrawer={toggleDrawer} />
        <Routes>
          <Route path={RoutesPaths.dashboard} element={<Dashboard />} />
          <Route path={RoutesPaths.despesas} element={<Despesas />} />
          <Route path={RoutesPaths.perfil} element={<Perfil />} />
          <Route path="*" element={<Navigate to={RoutesPaths.dashboard} replace />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
