import { Badge, FormControlLabel, IconButton } from "@mui/material";
import { MaterialUISwitch } from "./styles";

export default function ButtonNotification() {
  return (
    <IconButton color="inherit">
      <Badge color="secondary">
        <FormControlLabel
          control={<MaterialUISwitch  defaultChecked />}
          label=""
        />
      </Badge>
    </IconButton>
  );
}