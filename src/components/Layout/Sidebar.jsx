import { Box, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListIcon from '@mui/icons-material/List';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import { NavLink } from "react-router-dom";

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Lots", icon: <ListIcon />, path: "/lots" },
  { text: "Budget", icon: <AttachMoneyIcon />, path: "/budget" },
  { text: "Calendar", icon: <CalendarTodayIcon />, path: "/calendar" },
  { text: "Planification", icon: <TrackChangesIcon />, path: "/planning" },
];

export default function Sidebar() {
  return (
    <Box sx={{ width: 240, bgcolor: "#1976d2", height: "100vh", color: "#fff", position: "sticky", top: 0 }}>
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight="bold">Manage Farm</Typography>
      </Box>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            sx={{
              color: "#fff",
              "&.active": { bgcolor: "#1565c0" }
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
