import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CircularProgress, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useDespesaContext } from '../../contexts';
import { Colors } from '../../assets/theme';
import { useEffect, useState } from 'react';
import { Copyright, TitleCard } from '../../components';

export default function Dashboard() {
  const { despesas } = useDespesaContext();
  const [loadingTotalMes, setLoadingTotalMes] = useState(false);
  const [totalForMonth, setTotalForMonth] = useState<number | null>(null);

  console.log('despesas', despesas);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTotalMes(true);
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      const totalForMonth = despesas?.reduce((total, despesa) => {
        const despesaDate = new Date(despesa.date);
        if (despesaDate.getMonth() + 1 === currentMonth && despesaDate.getFullYear() === currentYear) {
          return total + despesa.amount;
        }
        return total;
      }, 0);

      setTotalForMonth(totalForMonth || 0);
      setLoadingTotalMes(false);
    };

    fetchData();
  }, [despesas]);

  const getTotalByMonth = (): { month: string; total: number, year: any }[] => {
    const totalsByMonth: { month: string; total: number, year: any }[] = [];

    despesas?.forEach((despesa) => {
      const despesaDate = new Date(despesa.date);
      const month = String(despesaDate.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
      const year = despesaDate.getFullYear();
      const existingMonthIndex = totalsByMonth.findIndex((item) => item.month === month && item.year === year);

      if (existingMonthIndex !== -1) {
        totalsByMonth[existingMonthIndex].total += despesa.amount;
      } else {
        totalsByMonth.push({ month, total: despesa.amount, year });
      }
    });

    // Ordena a lista do mês mais atual para o mais antigo
    totalsByMonth.sort((a, b) => {
      const aDate = new Date(`${a.year}-${a.month}-01`);
      const bDate = new Date(`${b.year}-${b.month}-01`);
      return bDate.getTime() - aDate.getTime();
    });

    return totalsByMonth;
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

          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 240,
                borderRadius: 5,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#888',
                  borderRadius: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#f2f2f2',
                  borderRadius: '6px',
                },
                scrollbarWidth: 'thin',
                scrollbarColor: '#888 #f2f2f2',
              }}
            >
              <TitleCard variant="h5" color={Colors.third}>Visão Geral</TitleCard>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Valor</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody
                  sx={{
                    maxHeight: 160,
                    overflowY: 'auto',
                  }}
                >
                  {getTotalByMonth().map((despesa: any) => (
                    <TableRow key={despesa.month + '|' + despesa.total + '|' + despesa.year}>
                      <TableCell>{despesa.month + ' / ' + despesa.year}</TableCell>
                      <TableCell>R$ {despesa.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  R$ {totalForMonth}
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

                <TableBody
                  sx={{
                    maxHeight: 160,
                    overflowY: 'auto',
                  }}
                >
                  {getTotalByMonth().map((despesa: any) => (
                    <TableRow key={despesa.month + '|' + despesa.total + '|' + despesa.year}>
                      <TableCell>{despesa.month + ' / ' + despesa.year}</TableCell>
                      <TableCell>R$ {despesa.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                
              </Table>
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
