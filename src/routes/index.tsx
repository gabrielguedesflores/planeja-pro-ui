import { Navigate, Route, Routes } from 'react-router-dom';
// import { createInterceptors } from 'api/createInterceptors.ts';
import Dashboard from '../pages/Dashboard';
import RoutesPaths from '../types';
import { useAuthContext } from '../contexts';
import { useState } from 'react';
import GlobalStyle from '../assets/GlobalStyle';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { AppBar, Sidebar } from '../components';
import Despesas from '../pages/Despesas';

export default () => {
  const accessToken = useAuthContext().acessToken;
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  
  if (!accessToken) {
    return <Navigate to={RoutesPaths.login} replace />;
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
        </Routes>
      </Box>
    </ThemeProvider>
  );
};

