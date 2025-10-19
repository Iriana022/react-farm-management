import { useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialLots = [
  { id: 1, name: "Lot #12", type: "Poulet", startDate: "2025-10-01", endDate: "2025-10-20", status: "Actif" },
  { id: 2, name: "Lot #11", type: "Canard", startDate: "2025-09-15", endDate: "2025-10-10", status: "Terminé" },
  { id: 3, name: "Lot #13", type: "Poulet", startDate: "2025-10-05", endDate: "2025-10-25", status: "Actif" },
];

export default function LotList() {
  const [lots, setLots] = useState(initialLots);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedLot, setSelectedLot] = useState(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState("");

  const getStatusColor = (status) => {
    switch(status) {
      case "Actif": return "success";
      case "Terminé": return "default";
      case "Prévu": return "warning";
      default: return "primary";
    }
  };

  const handleEditOpen = (lot) => {
    setSelectedLot(lot);
    setEditName(lot.name);
    setEditType(lot.type);
    setEditDialogOpen(true);
  };

  const handleEditSave = () => {
    setLots(lots.map(l => l.id === selectedLot.id ? { ...l, name: editName, type: editType } : l));
    setEditDialogOpen(false);
  };

  const handleDeleteOpen = (lot) => {
    setSelectedLot(lot);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setLots(lots.filter(l => l.id !== selectedLot.id));
    setDeleteDialogOpen(false);
  };

  const sortedLots = [...lots].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Lots / Animaux 🐔
      </Typography>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Nom du lot</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date début</TableCell>
              <TableCell>Date fin</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedLots.map((lot) => (
              <TableRow key={lot.id} hover>
                <TableCell>{lot.name}</TableCell>
                <TableCell>{lot.type}</TableCell>
                <TableCell>{lot.startDate}</TableCell>
                <TableCell>{lot.endDate}</TableCell>
                <TableCell>
                  <Chip label={lot.status} color={getStatusColor(lot.status)} />
                </TableCell>
                <TableCell align="right">
                  <IconButton color="primary" onClick={() => handleEditOpen(lot)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteOpen(lot)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog pour édition */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Éditer le lot</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nom" value={editName} onChange={(e) => setEditName(e.target.value)} />
          <TextField label="Type" value={editType} onChange={(e) => setEditType(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleEditSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog pour suppression */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Supprimer le lot ?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" color="error" onClick={handleDeleteConfirm}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
