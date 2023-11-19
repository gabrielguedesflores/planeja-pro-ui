import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, CircularProgress, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useDespesaContext } from '../../contexts';
import { Colors } from '../../assets/theme';
import { useEffect, useState } from 'react';
import { Copyright, TitleCard } from '../../components';
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { ArrowBackIos, ArrowForwardIos, Remove, Add } from '@mui/icons-material';

export default function Dashboard() {
  const { despesas } = useDespesaContext();
  const [loadingVisaoGeral, setLoadingVisaoGeral] = useState(false);
  const [loadingTotalMes, setLoadingTotalMes] = useState(false);
  const [loadingTotalMesRelatorios, setLoadingTotalMesRelatorios] = useState(false); // Novo estado
  const [totalForMonth, setTotalForMonth] = useState<any | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingTotalMes(true);
      setLoadingVisaoGeral(true);
      setTimeout(() => {
        setLoadingTotalMes(false);
        setLoadingVisaoGeral(false);
      }, 500);
      const currentYear = new Date().getFullYear();

      const totalForMonth = despesas?.reduce((total, despesa) => {
        const despesaDate = new Date(despesa.date);
        if (despesaDate.getMonth() + 1 === currentMonth && despesaDate.getFullYear() === currentYear) {
          return total + despesa.amount;
        }
        return total;
      }, 0);

      const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalForMonth || 0);

      setTotalForMonth(totalFormatted);
    };

    fetchData();
  }, [despesas, currentMonth]);

  // useEffect(() => {
  //   const fetchRelatoriosData = async () => {
  //     setLoadingTotalMesRelatorios(true);

  //     // Adicione aqui a lógica para carregar os relatórios

  //     setLoadingTotalMesRelatorios(false);
  //   };

  //   fetchRelatoriosData();
  // }, [currentMonth]);

  const handleMonthChange = (increment: number) => {
    setLoadingTotalMes(true);
    setCurrentMonth((prevMonth) => {
      const newMonth = prevMonth + increment;

      if (newMonth < 1) {
        return 12; // Voltar para dezembro do ano anterior
      } else if (newMonth > 12) {
        return 1; // Avançar para janeiro do próximo ano
      }

      return newMonth;
    });
    setLoadingTotalMes(false);
  };

  const getTotalByMonth = (): { month: string; monthDescription: string; totalFormatted: string; total: number; year: number }[] => {
    const totalsByMonth: { month: string; monthDescription: string; totalFormatted: string; total: number; year: number }[] = [];

    despesas?.forEach((despesa) => {
      const despesaDate = new Date(despesa.date);
      const month = String(despesaDate.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda se necessário
      const year = despesaDate.getFullYear();
      const monthDescription = new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(despesaDate);
      const totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.amount);

      const existingMonthIndex = totalsByMonth.findIndex((item) => item.month === month && item.year === year);

      if (existingMonthIndex !== -1) {
        totalsByMonth[existingMonthIndex].total += despesa.amount;
      } else {
        totalsByMonth.push({ month, monthDescription, totalFormatted, total: despesa.amount, year });
      }
    });

    // Ordena por ano e mês
    totalsByMonth.sort((a, b) => {
      const aDate = new Date(`${a.year}-${a.month}-01`);
      const bDate = new Date(`${b.year}-${b.month}-01`);
      return bDate.getTime() - aDate.getTime();
    });

    // Formata o total para o último item do array
    totalsByMonth.forEach((item) => {
      item.totalFormatted = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total);
    });

    console.log('totalsByMonth', totalsByMonth);

    return totalsByMonth;
  };

  const getLastSixMonths = (): { month: string; monthDescription: string; totalFormatted: string; total: number; year: number }[] => {
    const totalsByMonth = getTotalByMonth();

    // Obtém os últimos 6 meses
    const lastSixMonths = totalsByMonth.slice(0, 6);

    // Inverte a ordem dos resultados
    const reversedLastSixMonths = lastSixMonths.reverse();

    return reversedLastSixMonths;
  };

  const isCurrentMonth = (month: any) => month === currentMonth;

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
              {loadingVisaoGeral ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <TitleCard variant="h5" color={Colors.third}>Visão Geral</TitleCard>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Data</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Variação</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody
                      sx={{
                        maxHeight: 160,
                        overflowY: 'auto',
                      }}
                    >
                      {getTotalByMonth().map((despesa: any, index: number) => (
                        <TableRow key={despesa.month + '|' + despesa.total + '|' + despesa.year}>
                          <TableCell>{despesa.month + ' / ' + despesa.year}</TableCell>
                          <TableCell>{despesa.totalFormatted}</TableCell>
                          {index > 0 ? (
                            <TableCell>
                              {despesa.total > getTotalByMonth()[index - 1].total ? (
                                <IconButton color="success">
                                  <ArrowUpwardIcon />
                                </IconButton>
                              ) : (
                                <IconButton color="error">
                                  <ArrowDownwardIcon />
                                </IconButton>
                              )}
                            </TableCell>
                          ) : (
                            <TableCell>
                              <IconButton color="default">
                                <Remove />
                              </IconButton>
                            </TableCell>
                          )}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 130,
                borderRadius: 5,
              }}
            >
              {loadingTotalMes ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "50px" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <TitleCard variant="h5" color={Colors.third}>
                    Total mês
                  </TitleCard>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }}>
                    <MonetizationOnIcon style={{ fontSize: 32, marginRight: 8, color: Colors.lightPrimary }} />
                    <Typography variant="h5" style={{ color: Colors.lightPrimary, fontStyle: 'italic' }}>{totalForMonth}</Typography>
                  </div>
                </>
              )}
              <br /><br />
              <ButtonGroup>
                <Button
                  aria-label="reduce"
                  onClick={() => handleMonthChange(-1)}
                  style={{
                    border: 'none',
                    transition: 'margin-left 0.3s ease-in-out',
                    marginLeft: '-8px', // Adiciona margem negativa para criar o efeito de transição
                  }}
                >
                  <ArrowBackIos fontSize="small" />
                </Button>
                <div
                  style={{
                    marginLeft: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '8px',
                    transition: 'margin-left 0.3s ease-in-out',
                    fontStyle: 'italic',
                    textDecoration: 'underline',
                  }}
                >
                  {new Intl.DateTimeFormat('pt-BR', { month: 'long' }).format(
                    new Date(new Date().setMonth(currentMonth - 1, 1))
                  )}
                </div>
                <Button
                  aria-label="increase"
                  onClick={() => handleMonthChange(1)}
                  style={{
                    border: 'none',
                    pointerEvents: isCurrentMonth(12) ? 'none' : 'auto', // Desativa o botão se estiver no mês atual
                    opacity: isCurrentMonth(12) ? 0.5 : 1, // Reduz a opacidade se estiver no mês atual
                    transition: 'margin-left 0.3s ease-in-out',
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </Button>
              </ButtonGroup>


            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 5, }}>
              {loadingTotalMesRelatorios ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <TitleCard variant="h5" color={Colors.third}>Relatórios</TitleCard>
                  <ResponsiveContainer width="100%" height={300}>
                    {/* Adicionei um título alternativo para facilitar a identificação do eixo X */}
                    <LineChart data={getLastSixMonths()} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <XAxis dataKey="monthDescription" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="total" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </>
              )}
            </Paper>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
