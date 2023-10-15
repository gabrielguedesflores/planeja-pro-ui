import styled from '@emotion/styled';
import { Grid } from '@mui/material';

export const ContainerLogin = styled(Grid)`
  background-image: url(https://source.unsplash.com/random?wallpapers);
  background-repeat: no-repeat;
  backgroundColor: (t) =>
    t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
  background-size: cover;
  background-position: center;

`;