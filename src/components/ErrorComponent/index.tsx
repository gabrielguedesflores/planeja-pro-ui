import { Alert } from '@mui/material';
import { motion } from 'framer-motion';
import { Card, Body, Title } from './styles';
import { ReportProblemOutlined } from '@mui/icons-material';
import { Button, TitleCard } from '..';

export default function ErrorComponent({ resetErrorBoundary, error }: any) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        style={{
          width: '100vw',
          height: 'auto',
          minHeight: 'calc(100vh - 100px)',
          display: 'flex',
          padding: '1rem',
        }}
      >
        <Body>
          <Card>
            <Title>
              <ReportProblemOutlined style={{ fontSize: 34 }} />
              Oops!
            </Title>
            <TitleCard>Desculpe, encontramos um problema</TitleCard>

            <Alert severity='error' style={{ width: '100%', marginBottom: 12 }}>
              {error.message}
            </Alert>

            <Button
              fullWidth
              data-testid='error-btn'
              onClick={() => {
                resetErrorBoundary();
              }}
            >
              Ok
            </Button>
          </Card>
        </Body>
      </motion.div>
    </>
  );
}
