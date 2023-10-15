import styled from '@emotion/styled';
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

const Icon = styled(IconButton)`
  position: absolute;
  right: 1rem;
  top: 0.6rem;
`;

const InputPassword = ({ fullWidth, ...rest }: TextFieldProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div style={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField fullWidth={fullWidth} {...rest} type={show ? 'text' : 'password'} />
      <Icon data-testid='password-input-icon-button' onClick={() => setShow((s) => !s)} edge='end'>
        {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
      </Icon>
    </div>
  )
};

export default InputPassword;
