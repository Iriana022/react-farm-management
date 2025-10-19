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
import { format } from 'date-fns';

const initialPlans = [
  { id: 1, title: "Vaccination poulets", date: "2025-10-20", status: "Prévu" },
  { id: 2, title: "Récolte des oeufs", date: "2025-10-18", status: "En cours" },
  { id: 3, title: "Achat fourrage", date: "2025-10-15", status: "Terminé" },
];

export default function PlanningList() {
  const [plans, setPlans] = useState(initialPlans);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Prévu");

  const handleAdd = () => {
    setSelectedPlan(null);
    setTitle("");
    setDate("");
    setStatus("Prévu");
    setDialogOpen(true);
  };

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setTitle(plan.title);
    setDate(plan.date);
    setStatus(plan.status);
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!title || !date) return;

    if (selectedPlan) {
      setPlans(plans.map(p =>
        p.id === selectedPlan.id ? { ...p, title, date, status } : p
      ));
    } else {
      const newPlan = {
        id: plans.length ? Math.max(...plans.map(p => p.id)) + 1 : 1,
        title,
        date,
        status
      };
      setPlans([...plans, newPlan]);
    }
    setDialogOpen(false);
  };

  const handleDelete = (plan) => {
    setPlans(plans.filter(p => p.id !== plan.id));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Prévu": return "warning";
      case "En cours": return "info";
      case "Terminé": return "success";
      default: return "primary";
    }
  };

  const sortedPlans = [...plans].sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Planification / Objectifs 📅
      </Typography>

      <Button variant="contained" sx={{ mb: 3 }} onClick={handleAdd}>+ Ajouter</Button>

      <Grid container spacing={2}>
        {sortedPlans.map(plan => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ p: 2, boxShadow: 3 }}>
              {/* Date mise en avant */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  {format(new Date(plan.date), "dd/MM/yyyy")}
                </Typography>
                <Chip label={plan.status} color={getStatusColor(plan.status)} size="small" />
              </Box>

              <CardContent sx={{ p: 0 }}>
                <Typography variant="h6" fontWeight="bold">{plan.title}</Typography>
              </CardContent>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <IconButton color="primary" onClick={() => handleEdit(plan)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(plan)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{selectedPlan ? "Éditer l'objectif" : "Ajouter un objectif"}</DialogTitle>
        <DialogContent sx={{ display:'flex', flexDirection:'column', gap:2, mt:1, minWidth:300 }}>
          <TextField label="Titre" value={title} onChange={(e)=>setTitle(e.target.value)} />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Statut"
            select
            value={status}
            onChange={(e)=>setStatus(e.target.value)}
          >
            <MenuItem value="Prévu">Prévu</MenuItem>
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Terminé">Terminé</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setDialogOpen(false)}>Annuler</Button>
          <Button variant="contained" onClick={handleSave}>{selectedPlan ? "Enregistrer" : "Ajouter"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
