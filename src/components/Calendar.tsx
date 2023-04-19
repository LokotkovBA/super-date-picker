import React, { useState } from "react";
import { getCalendarDates } from "~/utils/dateFunctions";
import clsx from "clsx";

const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const [datesArray, monthsArray, todayIndex] = getCalendarDates(Date.now());

function dateStyles(isToday: boolean, isUserSelected: boolean, isSelectedMonth: boolean) {
    const isTodayNotSelected = !isUserSelected && isToday;
    return clsx("cursor-pointer border-2 duration-200 hover:scale-125 hover:font-bold hover:underline p-1.5 leading-none w-8 text-center",
        {
            "text-sky-500 font-bold": isTodayNotSelected,
            "bg-sky-700 border-sky-500 rounded": isUserSelected,
            "border-slate-950": !isUserSelected,
            "text-slate-50": isSelectedMonth && !isTodayNotSelected,
            "text-slate-500": !isSelectedMonth && !isTodayNotSelected
        });
}

type CalendarProps = {
    selectedDate: number
}
const Calendar: React.FC<CalendarProps> = () => {
    const [userSelectedDateIndex, setUserSelectedDateIndex] = useState(todayIndex);
    return (
        <div className="max-w-xs bg-slate-950 grid grid-cols-7 gap-1 justify-items-center p-3">
            {daysOfWeek.map(day => {
                return <div key={day} className="text-slate-500">{day}</div>;
            })}
            {datesArray.map((date, index) => {
                return <div onClick={() => setUserSelectedDateIndex(index)}
                    className={dateStyles(index === todayIndex, index === userSelectedDateIndex, monthsArray[index] === 0)} key={index}>
                    {date}
                </div>;
            })}
        </div >
    );
};

export default Calendar;
