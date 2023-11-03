import React, { useState } from 'react';
import { Badge, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { Link } from 'react-router-dom';

export default function Profile() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      >
        <MenuItem onClick={handleMenuClose} component={Link} to="/perfil">Perfil</MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/configuracoes">Configurações</MenuItem>
        <MenuItem onClick={handleMenuClose} component={Link} to="/sair">Sair</MenuItem>
      </Menu>
    </div>
  );
}
