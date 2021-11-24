import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { messages } from "../../../helpers/calendar-messages-es";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "moment/locale/es";

import { useDispatch, useSelector } from "react-redux";
import {
  eventSetActive,
  eventClearActiveEvent,
  eventStartLoading,
} from "../../../actions/events";

import { AddNewFab } from "./ui/AddNewFab";
import { DeleteEventFab } from "./ui/DeleteEventFab";

import moment from "moment";

moment.locale("es");

const localizer = momentLocalizer(moment);

function CalendarComp() {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onSelectEvent = (e) => {
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: event.dni ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "flex",
      color: "white",
    };

    return {
      style,
    };
  };

  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{
          event: CalendarEvent,
        }}
      />

      <AddNewFab />

      {activeEvent && <DeleteEventFab />}

      <CalendarModal />
    </>
  );
}

export default CalendarComp;
