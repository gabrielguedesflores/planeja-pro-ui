import { Autocomplete, Checkbox, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { Button, Modal, InputCurrency } from "../../components";
import { Colors } from "../../assets/theme";
import { useMemo, useState } from "react";
import { useAuthContext, useDespesaContext } from "../../contexts";
import { CurrencyInput } from "../../components/masks";
import { Endpoints, axiosInstance } from "../../api";
import { Despesa } from "../../types";

interface ModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  despesas: Despesa[];
}

export default function ModalCriacao({ open, setOpen, despesas }: ModalProps) {
  const { getDespesas, getTags } = useDespesaContext();
  const { getSession } = useAuthContext();
  const [descricao, setDescricao] = useState<string>('');
  const [valor, setValor] = useState<Number>(0);
  const [data, setData] = useState<string>('');
  const [tags, setTags] = useState<any>(getTags(despesas!));
  const [selectedTags, setSelectedTags] = useState<any[]>([]);
  const [recorrencia, setRecorrencia] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>();

  const handleClose = () => setOpen(false);

  console.log('[tags]', tags);

  const createExpense = async () => {
    try {
      setLoading(true);
      const newExpense = {
        amount: valor,
        date: data,
        description: descricao,
        tags: selectedTags,
        userId: getSession().user.id,
        recurrence: recorrencia
      }
      console.log('newExpense', newExpense);

      await axiosInstance.post(
        Endpoints.expense.post(),
        newExpense
      )
      setLoading(false);
      setOpen(false);
      emptyModal()
      getDespesas();
    } catch (error) {
      console.log(error);
      setLoading(false);
      setOpen(false);
    }
  };

  const FieldComponent = useMemo(() => {
    return (props: any) => <CurrencyInput {...props} />;
  }, []);

  const handleAddTag = (event: any, newTags: any[]) => {
    console.log('newTags', newTags);

    setSelectedTags((prevSelectedTags: any) => {
      const updatedSelectedTags = [...prevSelectedTags];
      newTags.forEach((tag: any) => {
        if (typeof tag === 'string' && !updatedSelectedTags.includes(tag)) {
          updatedSelectedTags.push(tag);
        }
      });
      return updatedSelectedTags.filter((tag, index) => updatedSelectedTags.indexOf(tag) === index);
    });
  };

  const emptyModal = () => {
    setDescricao('');
    setValor(0);
    setData('');
    setSelectedTags([]);
    setRecorrencia(false);
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Typography id="custom-modal-title" variant="h6" component="h2">
        Cadastre uma despesa
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="description"
            name="description"
            label="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            fullWidth
            autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputCurrency
            label='Valor'
            value={valor}
            name='amount'
            onChange={(e) => {
              setValor(Number(e.target.value));
            }}
            inputComponent={FieldComponent}
            money
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="date"
            name="date"
            label="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="size-small-outlined-multi"
            options={tags}
            value={selectedTags}
            getOptionLabel={(option) => Array.isArray(option) ? option.join(', ') : option}
            freeSolo
            onChange={handleAddTag}
            renderInput={(params) => (
              <TextField {...params} label="Tags" placeholder="Selecione ou crie uma tag" />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="recurrence"
                checked={recorrencia}
                onChange={(e) => setRecorrencia(e.target.checked)}
              />
            }
            label="Possui recorrência?"
          />
        </Grid>
      </Grid>
      <br />
      <Button
        text="Adicionar"
        buttonColor={Colors.primary}
        variant="contained"
        fullWidth
        onClick={() => createExpense()}
        loading={loading}
        disabled={
          !descricao ||
          !valor ||
          !data ||
          selectedTags.length === 0
        }
      />
    </Modal>
  );
};
