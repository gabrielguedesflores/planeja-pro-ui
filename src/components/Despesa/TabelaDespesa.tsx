import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function TabelaDespesa() {

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Descrição</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Tags</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* Suponha que temos um array "despesas" que contém nossos dados */}
          {/* Este é apenas um esqueleto e não implementa a funcionalidade completa de edição/exclusão */}
          {/* Despesas.map((despesa) => (
            <TableRow key={despesa.id}>
              <TableCell>{despesa.descricao}</TableCell>
              <TableCell>R$ {despesa.valor}</TableCell>
              <TableCell>{despesa.tags.join(', ')}</TableCell>
              <TableCell>
                <Button>Edit</Button>
                <Button>Delete</Button>
              </TableCell>
            </TableRow>
          )) */}
        </TableBody>
      </Table>
    </Paper>
  );
}