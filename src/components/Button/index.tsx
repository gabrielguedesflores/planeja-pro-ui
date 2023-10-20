import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { Colors } from "../../assets/theme";
import { Add } from "@mui/icons-material";

interface CustomButtonProps extends Omit<ButtonProps, 'color'> {
  text?: string;
  buttonColor?: string;
  variant?: 'text' | 'outlined' | 'contained';
  icon?: React.ReactElement;
  startIcon?: boolean;
}

export default function CustomButton({
  text = "Adicionar",
  buttonColor = "primary",
  variant = "contained",
  icon = <Add />,
  startIcon = false,
  ...rest
}: CustomButtonProps) {

  const color = buttonColor ? buttonColor : Colors.primary;

  let style: React.CSSProperties = {};

  if (variant === 'outlined') {
    style = {
      borderColor: color,
      color: color,
    };
  } else if (variant === 'contained') {
    style = {
      backgroundColor: color,
    };
  }

  return (
    <Button 
      variant={variant}
      style={style} 
      startIcon={startIcon ? icon : undefined}
      endIcon={!startIcon ? icon : undefined}
      {...rest}
    >
      {text}
    </Button>
  );
}
