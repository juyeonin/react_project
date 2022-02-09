import React from "react";
import MainLayout from "../../layout/MainLayout";
import CalendarContainer from "../../containers/calendar/CalendarContainer";

const CalendarPage = () => {
    return (
        <MainLayout>
            <CalendarContainer />
        </MainLayout>
    );
};

export default CalendarPage;