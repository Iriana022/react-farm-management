import { useState } from "react";
import { Box, Typography, TextField, Button, Card, CardContent, Grid, Avatar } from "@mui/material";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import EventIcon from '@mui/icons-material/Event';

const mockEvents = [
  { id: 1, title: 'Arrivée lot #12', date: new Date('2025-10-10') },
  { id: 2, title: 'Vaccination', date: new Date('2025-10-15') },
  { id: 3, title: 'Départ lot #11', date: new Date('2025-10-25') },
];

export default function EventList() {
  const [events, setEvents] = useState(mockEvents);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newEventTitle, setNewEventTitle] = useState("");

  const addEvent = () => {
    if (!newEventTitle || !selectedDate) return;
    setEvents([
      ...events,
      { id: events.length + 1, title: newEventTitle, date: selectedDate }
    ]);
    setNewEventTitle("");
    setSelectedDate(null);
  };

  const sortedEvents = [...events].sort((a, b) => b.date - a.date);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Événements de la ferme 📅
        </Typography>

        {/* Formulaire d'ajout */}
        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <TextField
            label="Nom de l'événement"
            value={newEventTitle}
            onChange={(e) => setNewEventTitle(e.target.value)}
            sx={{ flex: 1, minWidth: 200 }}
          />
          <DatePicker
            label="Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" color="primary" onClick={addEvent}>
            + Ajouter
          </Button>
        </Box>

        {/* Liste stylée des événements */}
        <Grid container spacing={2}>
          {sortedEvents.map((event) => (
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: '#f5f5f5', boxShadow: 3 }}>
                <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                  <EventIcon />
                </Avatar>
                <CardContent sx={{ p: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {event.date.toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </LocalizationProvider>
  );
}
