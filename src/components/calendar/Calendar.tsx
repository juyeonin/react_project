import React, { useState } from "react";
import FullCalendar, { EventClickArg } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import "./calendar.css";

const Calendar = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [eventModal, setEventModal] = useState<EventClickArg>();

  const modalOpen = () => {
    setOpenModal(!openModal);
  };

  return (
    <div style={{ textAlign: "center", alignItems: "center" }}>
      <br />
      <h2>CALENDAR</h2>
      <div style={{ width: "80%", margin: "0 auto 30px" }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            { title: "testEvent 1", date: "2022-02-25" },
            { title: "testEvent 2", date: "2022-02-12" },
          ]}
          eventClick={function (event) {
            setOpenModal(!openModal);
            setEventModal(event);
          }}
        />

        {openModal && (
          <div className="modalContainer">
            <div className="modalMain">
              <button className="modalButton" onClick={modalOpen}>
                <strong>X</strong>
              </button>
              <div className="eventModal">
                <p>일 정</p>
                <p style={{ color: "black" }}>{eventModal?.event.title}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
