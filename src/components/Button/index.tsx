import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";  // Importação para o ícone de carregamento.
import { Colors } from "../../assets/theme";
import { Add } from "@mui/icons-material";

interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  text?: string;
  buttonColor?: string;
  variant?: 'text' | 'outlined' | 'contained';
  icon?: React.ReactElement;
  startIcon?: boolean;
  loading?: boolean;  // Propriedade para mostrar o estado de carregamento.
  loadingMessage?: string;  // Mensagem de carregamento.
}

export default function CustomButton({
  text = "Adicionar",
  buttonColor = "primary",
  variant = "contained",
  icon = <Add />,
  startIcon = false,
  loading = false,
  loadingMessage = "Carregando...",
  ...rest
}: CustomButtonProps) {

  const color = buttonColor ? buttonColor : Colors.primary;
  const isDisabled = rest.disabled || loading;  // Verificar se o botão deve ser desativado.

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
      startIcon={startIcon && !loading ? icon : undefined}
      endIcon={!startIcon && !loading ? icon : undefined}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? loadingMessage : text}
    </Button>
  );
}
