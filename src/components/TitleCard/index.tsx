import React from "react";
import Typography from "@mui/material/Typography";
import { Fonts } from "../../assets/theme";

interface TitleCardProps {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2";
  color?: string;
}

const TitleCard: React.FC<TitleCardProps> = ({ children, variant = "h6", color = "textPrimary" }) => {
  return <Typography variant={variant} color={color} sx={{ fontFamily: Fonts.font_family}}>{children}</Typography>;
};

export default TitleCard;
