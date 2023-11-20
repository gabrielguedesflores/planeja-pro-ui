
import { ButtonProps as MuiButtonProps, CircularProgress } from '@mui/material';
import { CustomButton } from './styles';

interface ButtonProps extends MuiButtonProps {
  loading?: boolean;
  loadingMessage?: string;
  centered?: boolean;
  styles?: any;
}

export default function Button({
  children,
  disableElevation = true,
  variant = 'contained',
  color = 'primary',
  loading = false,
  loadingMessage = 'Carregando',
  disabled,
  startIcon,
  endIcon,
  styles,
  ...rest
}: ButtonProps) {
  return (
    <CustomButton
      className={startIcon ? 'with-icon' : ''}
      startIcon={startIcon}
      color={color}
      variant={variant}
      disableElevation={disableElevation}
      disabled={disabled || loading}
      endIcon={loading ? <CircularProgress size={15} /> : endIcon}
      sx={styles}
      {...rest}
    >
      {loading && loadingMessage ? loadingMessage : children}
    </CustomButton>
  );
}
