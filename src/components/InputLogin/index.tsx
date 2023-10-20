import styled from '@emotion/styled';
import { ErrorMsg, HelperText } from './styles';
import { CircularProgress, TextField, TextFieldProps } from '@mui/material';

const Icon = styled('div')`
  position: absolute;
  right: 1rem;
  top: 1rem;
`;

export interface InputProps {
  loading?: boolean;
  errorMsg?: string;
  help?: string;
}

const InputLogin = ({
  fullWidth,
  loading,
  errorMsg,
  disabled,
  error,
  help,
  ...rest
}: InputProps & TextFieldProps) => {
  return (
    <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField fullWidth {...rest} disabled={disabled || loading} />
      {loading && (
        <Icon data-testid='input-icon-loading'>
          <CircularProgress size={20} />
        </Icon>
      )}
      {help && <HelperText data-testid='input-help-message'>{help}</HelperText>}
      {!!error && (
        <ErrorMsg data-testid='input-error-message'>{errorMsg}</ErrorMsg>
      )}
    </div>
  );
};

export default InputLogin;
