import React, { useState } from "react";
import { getCalendarDates } from "~/utils/dateFunctions";
type CalendarProps = {
    selectedDate: number
}
const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const [datesArray, monthsArray, todayIndex] = getCalendarDates(Date.now());

const Calendar: React.FC<CalendarProps> = () => {
    const [userSelectedDate, setUserSelectedDate] = useState(todayIndex);
    return (
        <div className="max-w-xs bg-slate-950 grid grid-cols-7 gap-1 justify-items-center p-3">
            {daysOfWeek.map(day => {
                return <div className="text-slate-500">{day}</div>;
            })}
            {datesArray.map((date, index) => {
                return <div onClick={() => setUserSelectedDate(index)} className={`cursor-pointer border-2 border-slate-950 duration-200 hover:scale-125 hover:font-bold
                ${index === userSelectedDate ? "bg-sky-700 border-sky-500 rounded" : ""}
                ${index !== userSelectedDate && index === todayIndex ? "text-sky-500 font-bold" : ""}
                ${monthsArray[index] === 0 ? "text-slate-50" : " text-slate-500"}
                hover:underline p-1.5 leading-none`} key={index}>{date}</div>;
            })}
        </div>
    );
};

export default Calendar;
