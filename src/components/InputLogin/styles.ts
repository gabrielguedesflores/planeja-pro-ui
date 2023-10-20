import styled from '@emotion/styled';

interface ErrorMsgProps {
  textAlign?: 'center' | 'left' | 'right' | 'justify';
}

export const ErrorMsg = styled('small')<ErrorMsgProps>`
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  color: ${({ theme }: any) => theme.palette.error.main}; // Use theme from MUI
  text-align: ${({ textAlign }) => (textAlign ? textAlign : 'unset')};
  font-size: ${({ theme }: any) => theme.typography.caption.fontSize}; // Use theme from MUI
  letter-spacing: 0.03333em;
`;

export const HelperText = styled('div')`
  font-size: ${({ theme }: any) => theme.typography.caption.fontSize}; // Use theme from MUI
  color: ${({ theme }: any) => theme.palette.text.secondary}; // Use theme from MUI
  word-break: break-all;
  background-color: ${({ theme }: any) => theme.palette.background.default}; // Use theme from MUI
  padding: 8px 16px;
  text-align: left;
  border-radius: 0px 0px 4px 4px;
`;

export const AlertText = styled(HelperText)`
  border-radius: 4px 4px 0px 0px;
  display: flex;
  align-items: center;
`;
