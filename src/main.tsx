import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes/index.tsx';
import ErrorComponent from './components/ErrorComponent/index.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import GlobalStyle from './assets/GlobalStyle.ts';
import GlobalContextProvider from './contexts';
import { createTheme } from '@mui/material';
import { Global } from '@emotion/react';

const defaultTheme = createTheme();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Global styles={GlobalStyle} />
    <ThemeProvider theme={defaultTheme}>
      <GlobalContextProvider>
        <BrowserRouter>
          <ErrorBoundary FallbackComponent={ErrorComponent}>
            <Routes />
          </ErrorBoundary>
        </BrowserRouter>
      </GlobalContextProvider>
    </ThemeProvider>
  </>,
);
