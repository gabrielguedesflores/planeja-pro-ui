import { Box, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { Breadcrumb, Copyright, Button, TabelaDespesa } from "../../components";
import { Colors } from "../../assets/theme";
import { useEffect, useState } from "react";
import { useDespesaContext } from "../../contexts";
import ModalCriacao from "./ModalCriacao";

export default function Despesas() {
  const { getDespesas, despesas, getTags } = useDespesaContext();
  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState<any>(getTags(despesas!));
  const handleOpen = () => setOpen(true);
  console.log('[Despesas]', despesas);
  console.log('[tags]', tags);

  useEffect(() => {
    getDespesas();
  }, []);

  useEffect(() => {
    setTags(getTags(despesas!));
  }, [despesas]);

  const calculateTotalForMonth = () => {
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const totalForMonth = despesas?.reduce((total, despesa) => {
      const despesaDate = new Date(despesa.date);
      if (despesaDate.getMonth() + 1 === currentMonth && despesaDate.getFullYear() === currentYear) {
        return total + despesa.amount;
      }
      return total;
    }, 0);

    return totalForMonth!.toFixed(2);
  };

  const calculateTotalForYear = () => {
    const currentYear = new Date().getFullYear();

    const totalForYear = despesas?.reduce((total, despesa) => {
      const despesaDate = new Date(despesa.date);
      if (despesaDate.getFullYear() === currentYear) {
        return total + despesa.amount;
      }
      return total;
    }, 0);

    return totalForYear!.toFixed(2);
  };

  const firstSection = () => {
    return (
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={false} sm={6} md={8}>
            <Breadcrumb />
          </Grid>
          <Grid item container xs={12} sm={6} md={4} justifyContent="flex-end" spacing={2}>
            <Grid item xs={6} sm={7} md={6}>
              <Button
                text="Adicionar"
                buttonColor={Colors.primary}
                variant="contained"
                fullWidth
                onClick={handleOpen}
              />
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

          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                  style={{
                    padding: "16px",
                    marginBottom: "24px",
                    border: `1px solid ${Colors.primary}`,
                    borderRadius: "8px",
                  }}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                  }}
                >
                  <Typography variant="h6">Valor Total do Mês</Typography>
                  <Typography>R$ {calculateTotalForMonth()}</Typography>
                </Paper>
              </Grid>

              {/* <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                  style={{
                    padding: "16px",
                    marginBottom: "24px",
                    border: `1px solid ${Colors.primary}`,
                    borderRadius: "8px",
                  }}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                  }}
                >
                  <Typography variant="h6">Valor Total com Filtro</Typography>
                  <Typography>R$ {calculateTotalForFilteredDespesas().toFixed(2)}</Typography>
                </Paper>
              </Grid> */}

              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Paper
                  style={{
                    padding: "16px",
                    marginBottom: "24px",
                    border: `1px solid ${Colors.primary}`,
                    borderRadius: "8px",
                  }}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 100,
                  }}
                >
                  <Typography variant="h6">Valor Total no Ano</Typography>
                  <Typography>R$ {calculateTotalForYear()}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <TabelaDespesa despesas={despesas} />
          </Grid>

          <ModalCriacao open={open} setOpen={setOpen} despesas={despesas!} />

        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
};
