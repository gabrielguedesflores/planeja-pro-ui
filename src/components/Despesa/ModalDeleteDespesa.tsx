import React, { useCallback, useState } from 'react';
import {
  Modal,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
} from '@mui/material';
import { Button } from '../';
import { Endpoints, axiosInstance } from '../../api';
import { Colors } from '../../assets/theme';

interface ModalProps {
  openModal: boolean;
  onClose: React.MouseEventHandler;
  onSuccess: () => void;
  id: string;
}

const ModalDeleteDespesa = ({ openModal, onClose, onSuccess, id }: ModalProps) => {
  const [loading, setLoading] = useState(false);
  console.log('ModalDeleteDespesa', id);
  
  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);

      await axiosInstance.delete(Endpoints.expense.delete(id));

      setLoading(false);
      onSuccess();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [id]);

  return (
    <Modal open={openModal}>
      <Card
        sx={{
          margin: '0 auto',
          marginTop: '30%',
          marginLeft: '50%',
          maxWidth: '348px',
          position: 'relative',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <CardHeader title='Descartar despesa?' />
        <CardContent>
          <Typography>
            A despesa será excluída para sempre. Tem certeza?
          </Typography>
        </CardContent>
        <CardActions style={{ gap: '0.5rem', flexDirection: 'column' }}>
          <Button
            fullWidth
            variant='contained'
            buttonColor={Colors.primary}
            onClick={onClose}
            text='Manter'
          />
          <Button
            fullWidth
            variant='outlined'
            buttonColor={Colors.primary}
            disabled={loading}
            text='Descartar'
            onClick={handleDelete}
            loading={loading}
          />
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ModalDeleteDespesa;
