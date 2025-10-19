import { Box, Typography, Chip } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { mockBudget } from "../../data/mockBudget";
import { planning } from "../../data/planning";
import { mockEvents } from "../../data/mockEvents";
import { mockLots } from "../../data/mockLots";
import { format, parseISO, compareAsc } from "date-fns";

const COLORS = ["#0088FE", "#FF8042"];

export default function Dashboard() {
  const totalRevenu = mockBudget
    .filter(e => e.type === "Revenu")
    .reduce((acc, e) => acc + e.amount, 0);
  const totalDepense = mockBudget
    .filter(e => e.type === "Dépense")
    .reduce((acc, e) => acc + e.amount, 0);
  const budgetData = [
    { name: "Revenu", value: totalRevenu },
    { name: "Dépense", value: totalDepense },
  ];

  const lastPlans = [...planning].sort((a,b)=>compareAsc(parseISO(a.date), parseISO(b.date))).slice(0,3);
  const nextEvent = [...mockEvents].sort((a,b)=>compareAsc(parseISO(a.date), parseISO(b.date)))[0];
  const lastLots = mockLots.slice(-3).reverse();

  return (
    <Box sx={{ p: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Typography variant="h4" sx={{ width: "100%", mb:2 }}>Tableau de bord 🌾</Typography>

      {/* Budget */}
      <Box sx={{ flex: "1 1 48%", border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>Budget</Typography>
        <Box sx={{ width: "100%", height: 250 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={budgetData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {budgetData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      {/* Prochains objectifs */}
      <Box sx={{ flex: "1 1 48%", border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>Prochains objectifs</Typography>
        {lastPlans.map(plan => (
          <Box key={plan.id} sx={{ mb:1, p:1, borderBottom:"1px solid #eee" }}>
            <Typography fontWeight="medium">{plan.title}</Typography>
            <Typography variant="body2">{format(parseISO(plan.date),"dd/MM/yyyy")}</Typography>
            <Chip
              label={plan.status}
              size="small"
              color={plan.status==="Prévu"?"warning":plan.status==="En cours"?"info":"success"}
              sx={{ mt:0.5, width:100 }}
            />
          </Box>
        ))}
      </Box>

      {/* Prochain événement */}
      <Box sx={{ flex: "1 1 48%", border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>Événement calendrier prochain</Typography>
        {nextEvent ? (
          <Box sx={{ mt:1 }}>
            <Typography variant="subtitle1">{nextEvent.title}</Typography>
            <Typography variant="body2">{format(parseISO(nextEvent.date),"dd/MM/yyyy")}</Typography>
          </Box>
        ) : <Typography>Aucun événement</Typography>}
      </Box>

      {/* Derniers lots */}
      <Box sx={{ flex: "1 1 48%", border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
        <Typography variant="h6" gutterBottom>Derniers lots</Typography>
        {lastLots.map(lot => (
          <Box key={lot.id} sx={{ mb:1, p:1, borderBottom:"1px solid #eee" }}>
            <Typography>{lot.name}</Typography>
            <Typography>{lot.quantity} {lot.unit}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
