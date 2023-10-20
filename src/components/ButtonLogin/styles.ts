import styled from '@emotion/styled';
import { Colors, Fonts, Spacing } from '../../assets/theme';
import { Button as MuiButton } from '@mui/material';

export const CustomButton = styled(MuiButton)(() => ({
  border: `1px solid ${Colors.neutral_medium}`,
  padding: Spacing.spacing_squish_md_r,
  textTransform: 'none',
  display: 'flex',
  '&.with-icon': {
    justifyContent: 'flex-start',
  },
  '&.MuiButton-label': {
    width: 'auto',
    textAlign: 'left',
  },
  '&.MuiButton-root': {
    fontSize: Fonts.font_size_sm,
  },
  '&.MuiButton-text': {
    display: 'inline-block',
    width: 'fit-content',
    border: 'none',
  },
}));
