import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle, Settings, ExitToApp, Person } from "@mui/icons-material";
import { Link, redirect } from 'react-router-dom';
import { useAuthContext } from '../../contexts';

export default function Profile() {
  const { logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    redirect('/login');
  };

  return (
    <div>
      <IconButton color="inherit" onClick={handleMenuOpen}>
        <Badge color="secondary">
          <AccountCircle fontSize="large" />
        </Badge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/perfil">
          <Person fontSize="small" style={{ marginRight: 8 }} />
          Perfil
        </MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/configuracoes" disabled>
          <Settings fontSize="small" style={{ marginRight: 8 }} />
          Configurações
        </MenuItem>
        <MenuItem onClick={() => handleLogout()} component={Link} to="/login">
          <ExitToApp fontSize="small" style={{ marginRight: 8 }} />
          Sair
        </MenuItem>
      </Menu>
    </div>
  );
}
