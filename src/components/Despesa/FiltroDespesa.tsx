import {
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from '@mui/icons-material/Search';
import { Button, InputTag } from "..";
import { useState } from "react";
import { Colors } from "../../assets/theme";

export default function FiltroDespesa() {
  const [selectedDateInit, setSelectedDateInit] = useState<Date | null>(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState<Date | null>(null);

  return (
    <Paper
      style={{
        padding: '16px',
        marginBottom: '24px',
        border: `1px solid ${Colors.primary}`,
        borderRadius: '8px'
      }}
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 280,
      }}
    >
      <Typography variant="h6" gutterBottom>
        <FilterAltIcon /> Filtros
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="description"
            name="description"
            label="Descrição"
            fullWidth
            variant="standard"
            sx={{ maxWidth: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputTag 
            styles={{ marginTop: '-5px' }} 
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            required
            id="dateInit"
            name="dateInit"
            label="Data Inicial"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={selectedDateInit}
            sx={{ maxWidth: '100%' }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="date"
            required
            id="dateEnd"
            name="dateEnd"
            label="Data Final"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={selectedDateEnd}
            sx={{ maxWidth: '100%' }}
          />
        </Grid>

        <Grid item xs={7}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
        <Grid container item xs={5} spacing={2}>
          <Grid item>
            <Button text="Limpar" buttonColor={Colors.primary} variant="outlined" icon={<RestartAltIcon />} startIcon={false} />
          </Grid>
          <Grid item>
            <Button text="Buscar" buttonColor={Colors.primary} variant="contained" icon={<SearchIcon />} startIcon={false} />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
