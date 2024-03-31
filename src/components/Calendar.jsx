//https://fullcalendar.io/ 
import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import listPlugin from '@fullcalendar/list';
//tyyli
import './Calendar.css'
import AddTraining from "./AddTraining";


export default function Calendar(props) {
  const { fetchTrainings, fetchCustomers } = props;
  const [trainings, setTrainings] = useState([]);
  const [initialView, setInitialView] = useState('dayGridWeek');
  const [addedEvent, setAddedEvent] = useState(false);

  useEffect(() => {
    fetchTrainings(setTrainings);
  }, [addedEvent]);

  //https://fullcalendar.io/docs/event-object
  const events = trainings.map(training => ({
    id: training._links.training.href,
    title: `${training.activity} `,
    start: new Date(training.date),
    end: new Date(new Date(training.date).getTime() + training.duration * 60000),

    extendedProps: { // extra custom props
      client: `${training.customerFirstName} ${training.customerLastName}`,
      duration: `${training.duration}`
    }
  }));

  const eventContent = (eventInfo) => {
    //console.log(eventInfo);
    return (
      <>
        <div className="fullcalendar-content">
          <div className="fc-time-title"><span id="fc-time">{`${eventInfo.timeText}`}</span> {`${eventInfo.event.title}`}</div>
          <div className="fc-client-duration">{`${eventInfo.event.extendedProps.client} (${eventInfo.event.extendedProps.duration}min)`}</div>
        </div>
      </>
    );
  };


  return (
    <div className="calendar">

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView={initialView}
        events={events}
        eventContent={eventContent}
        eventTimeFormat={{
          hour: '2-digit',
          minute: '2-digit',
          omitZeroMinute: false,
          meridiem: false,
          hour12: false
        }}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek'
        }}
        firstDay={1}
        height="700px"
        views={{
          dayGridWeek: {
            dayHeaderFormat: { weekday: 'short', day: 'numeric' },
            weekNumbers: true
          },
          dayGridMonth: {
            weekNumbers: true
          }
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <AddTraining fetchCustomers={fetchCustomers} fetchTrainings={fetchTrainings} setAddedEvent={setAddedEvent} />
      </div>
    </div>
  )
}