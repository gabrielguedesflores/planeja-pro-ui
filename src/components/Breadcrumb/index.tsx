import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { StyledBreadcrumb } from './styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import RoutesPaths from '../../types';

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function Breadcrumb() {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          component="a"
          href={`/${RoutesPaths.dashboard}`}
          label="Dashboard"
          icon={<DashboardIcon fontSize="small" />}
        />
        <StyledBreadcrumb component="a" href="#" label="Despesas" />
      </Breadcrumbs>
    </div>
  );
}
