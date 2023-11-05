import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Badge,
  TextField,
  CircularProgress,
  Chip,
  Box, // Importe o componente Chip
} from "@mui/material";
import DateRangeIcon from "@mui/icons-material/DateRange";
import LabelIcon from "@mui/icons-material/Label";
import SortIcon from "@mui/icons-material/Sort";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import StringUtils from "../../utils/StringUtils";
import ModalDeleteDespesa from "./ModalDeleteDespesa";
import { useDespesaContext } from "../../contexts";

export default function TabelaDespesa(despesas: any) {
  const { getDespesas } = useDespesaContext();
  console.log("[TabelaDespesa]", despesas);
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuType, setMenuType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const [filtersApplied, setFiltersApplied] = useState({
    date: false,
    tags: false,
    sort: false,
  });
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idDespesa, setIdDespesa] = useState<string>("");

  const handleClick = (event: any, type: any) => {
    setMenuType(type);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const onSuccess = () => {
    setOpenModalDelete(false);
    getDespesas();
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  let isDateFilterApplied = dateRange.start && dateRange.end;

  const filteredDespesas = isDateFilterApplied
    ? despesas.despesas?.filter(
        (despesa: any) =>
          new Date(despesa.date) >= new Date(dateRange.start) &&
          new Date(despesa.date) <= new Date(dateRange.end)
      )
    : despesas.despesas?.filter((despesa: any) => {
        const despesaDate = new Date(despesa.date);
        return (
          despesaDate.getMonth() === currentMonth - 1 &&
          despesaDate.getFullYear() === currentYear
        );
      });

  const deleteDespesa = async (id: any) => {
    setIdDespesa(id);
    setOpenModalDelete(true);
  };

  useEffect(() => {
    if (isDateFilterApplied) {
      setFiltersApplied((prev) => ({ ...prev, date: true }));
    } else {
      setFiltersApplied((prev) => ({ ...prev, date: false }));
    }
  }, [isDateFilterApplied]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [despesas]);

  return (
    <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={2}
      >
        <div>
          {filtersApplied.date && (
            <Chip
              label={`Data: ${dateRange.start} - ${dateRange.end}`}
              onDelete={() => {
                setDateRange({ start: "", end: "" });
              }}
            />
          )}
        </div>
        <div>
          <Badge variant="dot" color="secondary" invisible={!filtersApplied.date}>
            <IconButton onClick={(e) => handleClick(e, "date")}>
              <DateRangeIcon />
            </IconButton>
          </Badge>
          <Badge variant="dot" color="secondary" invisible={!filtersApplied.tags}>
            <IconButton onClick={(e) => handleClick(e, "tags")}>
              <LabelIcon />
            </IconButton>
          </Badge>
          <Badge variant="dot" color="secondary" invisible={!filtersApplied.sort}>
            <IconButton onClick={(e) => handleClick(e, "sort")}>
              <SortIcon />
            </IconButton>
          </Badge>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {menuType === "date" && (
              <div style={{ padding: "10px" }}>
                <TextField
                  label="Data de início"
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  value={dateRange.start}
                />
                <TextField
                  label="Data de fim"
                  type="date"
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  value={dateRange.end}
                />
              </div>
            )}
            {menuType === "tags" && (
              <>
                <MenuItem onClick={handleClose}>Tag 1</MenuItem>
                <MenuItem onClick={handleClose}>Tag 2</MenuItem>
              </>
            )}
            {menuType === "sort" && (
              <>
                <MenuItem onClick={handleClose}>Ordenar por Descrição</MenuItem>
                <MenuItem onClick={handleClose}>Ordenar por Valor</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Box>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "" }}>
          <CircularProgress />
        </div>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Recorrência</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
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
          </TableBody>
        </Table>
      )}

      <ModalDeleteDespesa openModal={openModalDelete} onClose={handleCloseModalDelete} onSuccess={onSuccess} id={idDespesa} />
    </Paper>
  );
}
