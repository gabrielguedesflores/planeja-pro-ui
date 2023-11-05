import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { Colors } from "../../assets/theme";

interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  text?: string;
  buttonColor?: string;
  variant?: 'text' | 'outlined' | 'contained';
  icon?: React.ReactElement | null;
  startIcon?: boolean;
  loading?: boolean;
  loadingMessage?: string;
}

export default function CustomButton({
  text = "Adicionar",
  buttonColor = "primary",
  variant = "contained",
  icon = null,
  startIcon = false,
  loading = false,
  loadingMessage = "Carregando...",
  ...rest
}: CustomButtonProps) {

  const color = buttonColor ? buttonColor : Colors.primary;
  const isDisabled = rest.disabled || loading;

  let style: React.CSSProperties = {};

  if (variant === 'outlined') {
    style = {
      borderColor: isDisabled ? 'gray' : color,
      color: isDisabled ? 'gray' : color,
    };
  } else if (variant === 'contained') {
    style = {
      backgroundColor: isDisabled ? 'gray' : color,
    };
  }

  return (
    <Button 
      variant={variant}
      style={style} 
      startIcon={startIcon && !loading && icon !== null ? icon : undefined}
      endIcon={
        loading ? (
          <CircularProgress size={15} color="inherit" />
        ) : (
          !startIcon && icon !== null ? icon : undefined
        )
      }
      disabled={isDisabled}
      {...rest}
    >
      {loading ? loadingMessage : text}
    </Button>
  );
}
