import { Box, Container, Grid, Toolbar } from "@mui/material";
import { Breadcrumb, Copyright, FiltroDespesa, NovaDespesa, TabelaDespesa } from "../../components";

export default function Despesas() {
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Toolbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Breadcrumb />
              </Grid>
              <Grid item xs={2}>
                <NovaDespesa />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={8} lg={9}>
            <FiltroDespesa />
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            Grid Total
          </Grid>

          <Grid item xs={12}>
            <TabelaDespesa />
          </Grid>

        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};
