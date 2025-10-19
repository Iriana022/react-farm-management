import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const initialBudget = [
  { id: 1, title: "Achat nourriture", type: "Dépense", amount: 120 },
  { id: 2, title: "Vente oeufs", type: "Revenu", amount: 200 },
  { id: 3, title: "Achat matériel", type: "Dépense", amount: 80 },
];

export default function BudgetList() {
  const [entries, setEntries] = useState(initialBudget);

  // Dialog
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Dépense");
  const [amount, setAmount] = useState("");

  // Ouvrir le dialog pour ajout
  const handleAdd = () => {
    setSelectedEntry(null);
    setTitle("");
    setType("Dépense");
    setAmount("");
    setDialogOpen(true);
  };

  // Ouvrir le dialog pour édition
  const handleEdit = (entry) => {
    setSelectedEntry(entry);
    setTitle(entry.title);
    setType(entry.type);
    setAmount(entry.amount);
    setDialogOpen(true);
  };

  // Sauvegarder ajout ou modification
  const handleSave = () => {
    if (!title || !amount) return;
    const newAmount = parseFloat(amount);

    if (selectedEntry) {
      // Modifier existant
      setEntries(entries.map(e =>
        e.id === selectedEntry.id ? { ...e, title, type, amount: newAmount } : e
      ));
    } else {
      // Ajouter nouveau
      const newEntry = {
        id: entries.length ? Math.max(...entries.map(e => e.id)) + 1 : 1,
        title,
        type,
        amount: newAmount
      };
      setEntries([...entries, newEntry]);
    }
    setDialogOpen(false);
  };

  // Supprimer entrée
  const handleDelete = (entry) => {
    setEntries(entries.filter(e => e.id !== entry.id));
  };

  // Totaux
  const totalRevenu = entries.filter(e => e.type === "Revenu").reduce((acc, e) => acc + e.amount, 0);
  const totalDepense = entries.filter(e => e.type === "Dépense").reduce((acc, e) => acc + e.amount, 0);
  const solde = totalRevenu - totalDepense;

  const getChipColor = (type) => (type === "Revenu" ? "success" : "error");

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Budget de la ferme 💰
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }} onClick={handleAdd}>+ Ajouter</Button>

      {/* Totaux */}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <Card sx={{ flex: 1, bgcolor: '#e0f7fa', minHeight: 100 }}>
          <CardContent>
            <Typography variant="subtitle2">Total Revenu</Typography>
            <Typography variant="h6" fontWeight="bold">{totalRevenu} Ar</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, bgcolor: '#ffebee', minHeight: 100 }}>
          <CardContent>
            <Typography variant="subtitle2">Total Dépense</Typography>
            <Typography variant="h6" fontWeight="bold">{totalDepense} Ar</Typography>
          </CardContent>
        </Card>
        <Card sx={{ flex: 1, bgcolor: '#fff9c4', minHeight: 100 }}>
          <CardContent>
            <Typography variant="subtitle2">Solde</Typography>
            <Typography variant="h6" fontWeight="bold">{solde} Ar</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Liste des entrées */}
      <Grid container spacing={2}>
        {entries.map((entry) => (
          <Grid item xs={12} sm={6} md={4} key={entry.id}>
            <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, boxShadow: 3 }}>
              <CardContent sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">{entry.title}</Typography>
                <Chip label={entry.type} color={getChipColor(entry.type)} size="medium" sx={{ mt: 1 }} />
                <Typography variant="body1" sx={{ mt: 1 }}>{entry.amount} Ar</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton color="primary" onClick={() => handleEdit(entry)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(entry)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog ajout / édition */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{selectedEntry ? "Éditer l'entrée" : "Ajouter une entrée"}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1, minWidth: 300 }}>
          <TextField label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
          <TextField
            select
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="Revenu">Revenu</MenuItem>
            <MenuItem value="Dépense">Dépense</MenuItem>
          </TextField>
          <TextField
            label="Montant"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSave}>{selectedEntry ? "Enregistrer" : "Ajouter"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
