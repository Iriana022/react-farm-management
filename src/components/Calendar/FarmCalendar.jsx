import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { mockEvents } from "../../data/mockEvents";


export default function FarmCalendar() {
  const [events, setEvents] = useState(mockEvents); // <- ici on utilise le mock

  const handleDateClick = (info) => {
    const title = prompt("Nom de l’événement :");
    if (title) setEvents([...events, { id: events.length + 1, title, date: info.dateStr }]);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleDateClick}
    />
  );
}
