import { styled } from '@mui/material';
import { Colors, Shadows, Spacing } from '../../assets/theme';

export const Body = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
}));

export const Card = styled('div')(({ theme }) => ({
  width: '33rem',
  backgroundColor: Colors.neutral_lightest,
  boxShadow: Shadows.shadow_level_sm,
  borderRadius: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: Spacing.spacing_inline_sm,

  [theme.breakpoints.only('xs')]: {
    width: 'calc(100vw - 3.125rem)',
  },
}));

export const Title = styled('h1')(() => ({
  margin: '1rem 0',
  color: Colors.primary,
  textAlign: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}));
