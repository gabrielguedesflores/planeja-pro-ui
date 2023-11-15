import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Copyright, TitleCard } from '../../components';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useDespesaContext } from '../../contexts';
import { Colors } from '../../assets/theme';
import { Line } from 'recharts';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { despesas } = useDespesaContext();
  const [loadingTotalMes, setLoadingTotalMes] = useState(false);

  console.log('despesas', despesas);

  // const calculateTotalForMonth = () => {
  //   setLoadingTotalMes(true);
  //   const currentMonth = new Date().getMonth() + 1;
  //   const currentYear = new Date().getFullYear();

  //   const totalForMonth = despesas?.reduce((total, despesa) => {
  //     const despesaDate = new Date(despesa.date);
  //     if (despesaDate.getMonth() + 1 === currentMonth && despesaDate.getFullYear() === currentYear) {
  //       setLoadingTotalMes(false);
  //       return total + despesa.amount;
  //     }
  //     setLoadingTotalMes(false);
  //     return total;
  //   }, 0);

  //   setLoadingTotalMes(false);
  //   return totalForMonth // !.toFixed(2) || totalForMonth!;
  // };

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

          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                borderRadius: 5,
              }}
            >
              <TitleCard variant="h5" color={Colors.third}>Análise</TitleCard>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                borderRadius: 5,
              }}
            >
              {loadingTotalMes ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <TitleCard variant="h5" color={Colors.third}>Total este mês</TitleCard> 
                  
                  <br /><br />
                  {/* R$ {calculateTotalForMonth()} */}
                </>
              )}
            </Paper>
          </Grid>
          
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 5, }}>
              <TitleCard variant="h5" color={Colors.third}>Próximas do vencimento</TitleCard>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Pago</TableCell>
                  </TableRow>
                </TableHead>

                {/* <TableBody>
                  {filteredDespesas && filteredDespesas.length > 0
                    ? filteredDespesas.map((despesa: any) => (
                      <TableRow key={despesa._id}>
                        <TableCell>{despesa.description}</TableCell>
                        <TableCell>R$ {despesa.amount}</TableCell>
                        <TableCell>{StringUtils.format.formatDate(despesa.date)}</TableCell>
                        <TableCell>{despesa.tags.join(", ")}</TableCell>
                        <TableCell>{despesa.recurrence ? "Sim" : "Não"}</TableCell>
                        <TableCell>
                          <IconButton aria-label="delete" size="large">
                            <EditIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton aria-label="delete" size="large">
                            <DeleteIcon fontSize="inherit" onClick={() => deleteDespesa(despesa._id)} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                    : null}
                </TableBody> */}
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}