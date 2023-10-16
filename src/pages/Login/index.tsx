import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyle from '../../assets/GlobalStyle';
import { Copyright, Input, InputPassword } from '../../components';
import { Container, ContainerLogin } from './styles';
import StringUtils from '../../utils/StringUtils';
import { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import { useAuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import RoutesPaths from '../../types';

export default function Login() {
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const isLogged = await login({ userEmail: email, userPassword: password });
      
      if (isLogged) {
        navigate(RoutesPaths.dashboard);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }

};

  return (
    <ThemeProvider theme={GlobalStyle}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <ContainerLogin item xs={false} sm={4} md={7} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Container>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box sx={{ mt: 1 }}>

              <Input
                label='E-mail'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  // handleEmail(e.target.value);
                }}
                name='email'
                error={!StringUtils.validation.validateEmail(email)}
                errorMsg='Precisamos de um e-mail válido'
                sx={{ marginBottom: 2 }}
              />

              <InputPassword
                label='Senha'
                placeholder='Senha'
                name='password'
                data-testid='login-password'
                fullWidth
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              />

              {isLoading ? (
                <LoadingButton
                  loading
                  loadingPosition="start"
                  startIcon={<HourglassBottomIcon />}
                >
                  Carregando...
                </LoadingButton>
              ) : (
                <Button
                  data-testid='login-btn'
                  onClick={async (event: any) => await onSubmit(event)}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!email || !password}
                >
                  Entrar
                </Button>

              )}

              <Grid container>
                <Grid item sm={12} md={12}>
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}