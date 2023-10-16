import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import RoutesPaths from '../types';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { AppBar, Sidebar } from '../components';
import Despesas from '../pages/Despesas';
import Login from '../pages/Login';
import GlobalStyle from '../assets/GlobalStyle';
import { useAuthContext } from '../contexts';

export default function AppRoutes() {
  const { getSession } = useAuthContext();
  const [token, setToken] = useState(getSession().accessToken);
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => setOpen(!open);

  useEffect(() => {
    setToken(getSession().accessToken);
  }, [getSession]);
  
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
          <Route path="*" element={<Navigate to={RoutesPaths.dashboard} replace />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}
