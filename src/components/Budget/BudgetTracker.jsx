import { useState } from "react";
import { Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import { mockBudget } from "../../data/mockBudget";

export default function BudgetTracker() {
  const [entries, setEntries] = useState(mockBudget);

  const total = entries.reduce((sum, e) => e.type === 'Revenu' ? sum + e.amount : sum - e.amount, 0);

  const addEntry = () => {
    const type = prompt('Type (Revenu/Dépense) :');
    const label = prompt('Label :');
    const amount = parseInt(prompt('Montant :'));
    if (type && label && amount) setEntries([...entries, { id: entries.length + 1, type, label, amount }]);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>Suivi budgétaire 💰</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Montant</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.type}</TableCell>
              <TableCell>{e.label}</TableCell>
              <TableCell>{e.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant="h6" sx={{ mt: 2 }}>Solde : {total} AR</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={addEntry}>+ Ajouter une entrée</Button>
    </Box>
  );
}
