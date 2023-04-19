import "../tailwind.css";
import React from "react";
type CalendarProps = {
    selectedDate: number
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate }) => {
    return <div className="text-red-400">
        Ima calendar {selectedDate}
    </div>;
};

export default Calendar;
