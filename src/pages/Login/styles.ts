import styled from '@emotion/styled';
import { Box, Grid } from '@mui/material';

export const ContainerLogin = styled(Grid)`
  background-image: url(https://source.unsplash.com/random?wallpapers);
  background-repeat: no-repeat;
  background-color: ${({ theme }: any) => 
    theme.palette.mode === 'light' ? theme.palette.grey[50] : theme.palette.grey[900]};
  background-size: cover;
  background-position: center;
`;

export const Container = styled(Box)`
  margin-top: 8rem;        // my: 8 translates to margin-top and margin-bottom
  margin-bottom: 8rem;
  margin-left: 4rem;       // mx: 4 translates to margin-left and margin-right
  margin-right: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;