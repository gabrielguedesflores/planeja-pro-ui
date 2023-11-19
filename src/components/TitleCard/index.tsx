import React from "react";
import Typography from "@mui/material/Typography";
import { Fonts, Colors } from "../../assets/theme";

interface TitleCardProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2";
  color?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ children, variant = "h6", color = Colors.typography }) => {
  return (
    <Typography
      variant={variant}
      color={color}
      sx={{
        fontFamily: Fonts.font_family_primary,
        fontWeight: Fonts.font_weight_hg,
        lineHeight: Fonts.line_height_lg,
        letterSpacing: Fonts.letter_spacing_lg,
        marginBottom: '16px', // Espaço inferior para separar dos outros elementos
        borderBottom: `2px solid ${Colors.lighterGrey}`, // Adiciona uma linha de separação
        paddingBottom: '8px', // Espaçamento entre o texto e a linha
      }}
    >
      {children}
    </Typography>
  );
};

export default TitleCard;
