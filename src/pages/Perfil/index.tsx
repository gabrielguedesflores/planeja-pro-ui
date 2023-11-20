import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { CircularProgress, CssBaseline, TextField } from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useEffect, useMemo, useState } from 'react';
import { Button, Copyright, InputPassword, TitleCard, UploadButton } from '../../components';
import FadeIn from 'react-fade-in';
import { Colors } from '../../assets/theme';

export default function Dashboard() {
  const { getSession } = useAuthContext();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [imagemPerfil, setImagemPerfil] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  let session;

  useEffect(() => {
    setLoading(true);
    session = getSession();
    console.log('session', session);
    setNome(session.user.name);
    setEmail(session.user.email);
    setImagemPerfil(session.user.profileImage);
    setLoading(false);
  });

  const UploadComponent = useMemo(() => {
    return (props: any) => (
      <FadeIn>
        <UploadButton {...props} />
      </FadeIn>
    );
  }, []);

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
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', borderRadius: 5, }}>
              {loading ? (
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  <CircularProgress />
                </div>
              ) : (
                <>
                  <CssBaseline />
                  <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                    <TitleCard>Seu perfil</TitleCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <TextField
                          id="nome"
                          name="nome"
                          label="Nome"
                          value={nome}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          autoComplete="given-name"
                          variant="standard"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNome(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="email"
                          name="email"
                          label="E-mail"
                          value={email}
                          InputLabelProps={{ shrink: true }}
                          fullWidth
                          autoComplete="shipping address-level2"
                          variant="standard"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <InputPassword
                          label='Senha'
                          placeholder='Senha'
                          name='password'
                          data-testid='login-password'
                          fullWidth
                          value={senha}
                          variant="standard"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSenha(e.target.value)}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <UploadComponent
                          text='Carregar Imagem'
                          fileNames={imagemPerfil}
                          documentType='profileImage'
                          onChangeSuccess={(filesName: string[]) => {
                            setImagemPerfil(filesName);
                          }}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Button
                      text="Salvar"
                      buttonColor={Colors.primary}
                      variant="contained"
                      style={{ float: "right" }}
                    // onClick={handleOpen}
                    />
                  </Container>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
