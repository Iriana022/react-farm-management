import { AppBar, Toolbar, Typography, Box, Avatar, TextField, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { format } from "date-fns";
import logo from "../../assets/logo-farm.png"

export default function TopBar() {
  const currentDate = format(new Date(), "dd/MM/yyyy"); // Date courante

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo / Nom de l'application */}
        <img src={logo} style={{height:'60px'}}/>
        <Typography variant="h6" noWrap component="div">
          &emsp;FARM NEXT GEN
        </Typography>

        {/* Date courante */}
        <Typography variant="body1" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {currentDate}
        </Typography>

        {/* Barre de recherche + Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            size="small"
            placeholder="Rechercher..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Avatar alt="Utilisateur" src="" /> {/* Mettre src pour l'image */}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
