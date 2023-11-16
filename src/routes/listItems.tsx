import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link, useLocation } from 'react-router-dom';
import { Assessment, ImportExport, Receipt, TrendingUp } from '@mui/icons-material';
import { Colors } from '../assets/theme';

const MainListItems = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <React.Fragment>
      <Link to="/dashboard" style={{ textDecoration: 'none', color: Colors.light, }}>
        <ListItemButton selected={isActive("/dashboard")}>
          <ListItemIcon style={{ color: Colors.light, }}>
            <DashboardCustomizeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link to="/despesas" style={{ textDecoration: 'none', color: Colors.light, }}>
        <ListItemButton selected={isActive("/despesas")}>
          <ListItemIcon style={{ color: Colors.light, }}>
            <Receipt />
          </ListItemIcon>
          <ListItemText primary="Despesas" />
        </ListItemButton>
      </Link>

      <Link to="/receitas" style={{ textDecoration: 'none', color: Colors.light, }}>
        <ListItemButton disabled selected={isActive("/receitas")}>
          <ListItemIcon style={{ color: Colors.light, }}>
            <TrendingUp sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primary="Receitas" />
        </ListItemButton>
      </Link>

      <Link to="/importar-exportar" style={{ textDecoration: 'none', color: Colors.light, }}>
        <ListItemButton disabled selected={isActive("/importar-exportar")}>
          <ListItemIcon style={{ color: Colors.light, }}>
            <ImportExport />
          </ListItemIcon>
          <ListItemText primary="Importar/Exportar" />
        </ListItemButton>
      </Link>

      <Link to="/relatorios" style={{ textDecoration: 'none', color: Colors.light, }}>
        <ListItemButton disabled selected={isActive("/relatorios")}>
          <ListItemIcon style={{ color: Colors.light, }}>
            <Assessment sx={{ color: 'var(--mui-palette-primary-contrastText)' }} />
          </ListItemIcon>
          <ListItemText primary="Relatórios" />
        </ListItemButton>
      </Link>

      {/* ... e assim por diante para os outros links */}
    </React.Fragment>
  );
}

export default MainListItems;

export const secondaryListItems = (
  <React.Fragment>

    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
    
  </React.Fragment>
);