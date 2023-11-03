import { OutlinedInput as MUIOutlinedInput } from '@mui/material';
import { Colors, Fonts } from '../../assets/theme';
import styled from '@emotion/styled';

interface ErrorMsgProps {
  textAlign?: 'center' | 'left' | 'right' | 'justify';
}

export const ErrorMsg = styled.small<ErrorMsgProps>`
  
  color: ${Colors.danger};
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'unset')};
  font-size: ${Fonts.font_size_xxs};
  letter-spacing: 0.03333em;
`;

export const OutlinedInput = styled(MUIOutlinedInput)`
  background-color: #fff;

  &.Mui-disabled {
    cursor: not-allowed;
    background-color: ${Colors.lighterGrey};
  }
`;

export const HelperText = styled.div`
  font-size: ${Fonts.font_size_xxs};
  color: ${Colors.neutral_dark};
  word-break: break-all;
  background-color: ${Colors.neutral_light};
  padding: 8px 16px;
  text-align: left;
  border-radius: 0px 0px 4px 4px;
`;

export const AlertText = styled(HelperText)`
  border-radius: 4px 4px 0px 0px;
  display: flex;
  align-items: center;
`;
