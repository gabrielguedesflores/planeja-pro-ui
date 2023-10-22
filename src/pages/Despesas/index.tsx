import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import { Breadcrumb, Copyright, Button, TabelaDespesa } from "../../components";
import { Colors } from "../../assets/theme";
import { useEffect } from "react";
import { useDespesaContext } from "../../contexts";

export default function Despesas() {
  const { getDespesas, despesas } = useDespesaContext();
  if (!despesas) getDespesas();
  console.log('[Despesas]', despesas);

  useEffect(() => {
    if (!despesas) getDespesas();
  }, [despesas]);

  const firstSection = () => {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={false} sm={6} md={8}>
            <Breadcrumb />
          </Grid>
          <Grid item container xs={12} sm={6} md={4} justifyContent="flex-end" spacing={2}>
            <Grid item xs={6} sm={5} md={6}>
              <Button text="Tags" buttonColor={Colors.primary} variant="contained" fullWidth />
            </Grid>
            <Grid item xs={6} sm={7} md={6}>
              <Button text="Adicionar" buttonColor={Colors.primary} variant="contained" fullWidth />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

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
          {firstSection()}

          {[1, 2, 3].map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
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
                  height: 100,
                }}
              >
                Valor Total das Despesas <br /> R$ 4.534,87
              </Paper>
            </Grid>
          ))}

          <Grid item xs={12}>
            <TabelaDespesa despesas={despesas} />
          </Grid>

        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};
