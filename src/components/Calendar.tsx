import React, { useRef, useState } from "react";
import { getCalendarDates } from "~/utils/dateFunctions";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "~/assets/Arrows";

const daysOfWeek = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function dateStyles(isToday: boolean, isUserSelected: boolean, isSelectedMonth: boolean) {
    const isTodayNotSelected = !isUserSelected && isToday;
    return clsx("cursor-pointer border-2 duration-200 hover:scale-125 hover:font-bold hover:underline p-1.5 leading-none w-8 text-center",
        {
            "text-sky-500 font-bold": isTodayNotSelected,
            "bg-sky-700 border-sky-500 rounded": isUserSelected,
            "border-transparent": !isUserSelected,
            "text-gr neutral-50": isSelectedMonth && !isTodayNotSelected,
            "text-neutral-500": !isSelectedMonth && !isTodayNotSelected
        });
}
const arrowStyles = "hover:bg-neutral-800 rounded-lg";
const headingTextStyles = "text-xl focus:underline hover:text-sky-500 hover:cursor-pointer";

function useCalendar(date: Date) {
    const selectedDate = useRef<Date>(date);
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [userSelectedDateIndex, setUserSelectedDateIndex] = useState(0);
    const [dateData, setDateData] = useState(() => {
        const dateData = getCalendarDates(date);
        setUserSelectedDateIndex(dateData.todayIndex);
        return dateData;
    });

    function switchMonth(dif: number, userSelectedDay?: number) {
        let newMonth = selectedDate.current.getMonth() + dif;
        if (newMonth < 0) {
            newMonth = 11;
            selectedDate.current.setFullYear(selectedDate.current.getFullYear() - 1);
        } else if (newMonth > 11) {
            newMonth = 0;
            selectedDate.current.setFullYear(selectedDate.current.getFullYear() + 1);
        }
        selectedDate.current.setMonth(newMonth);
        if (selectedDate.current.getMonth() !== newMonth) {
            selectedDate.current.setDate(0);
        }
        if (userSelectedDay) {
            selectedDate.current.setDate(userSelectedDay);
        }
        const newDateData = getCalendarDates(selectedDate.current);
        setUserSelectedDateIndex(newDateData.userSelectedDay);
        setDateData(newDateData);
        setSelectedMonth(newMonth);
    }
    return { dateData, selectedMonth, switchMonth, userSelectedDateIndex, setUserSelectedDateIndex, selectedYear: selectedDate.current.getFullYear() } as const;
}

type CalendarProps = {
    selectedDate: Date
}
const Calendar: React.FC<CalendarProps> = ({ selectedDate }) => {
    const { dateData: { arrayOfDays, arrayOfMonths, todayIndex }, selectedMonth, switchMonth, userSelectedDateIndex, setUserSelectedDateIndex, selectedYear } = useCalendar(selectedDate);
    function onDateClick(index: number) {
        const userSelectedDay = arrayOfDays[index];
        if (!arrayOfMonths[index]) {
            selectedDate.setDate(userSelectedDay);
            setUserSelectedDateIndex(index);
            return;
        }

        switchMonth(arrayOfMonths[index], userSelectedDay);
    }
    return (
        <section className="font-sans text-xs p-3 w-fit bg-neutral-900 text-neutral-50 flex flex-col gap-1">
            <h2 className="flex items-center gap-2 mb-2">
                <button className={`mr-auto ${arrowStyles}`} onClick={() => switchMonth(-1)}><ArrowLeft size="1.5rem" color="fill-neutral-50" /></button>
                <button className={`font-medium ${headingTextStyles}`}>{months[selectedMonth]}</button>
                <button className={`font-light text-neutral-500 ${headingTextStyles}`}>{selectedYear}</button>
                <button className={`ml-auto ${arrowStyles}`} onClick={() => switchMonth(1)}><ArrowRight size="1.5rem" color="fill-neutral-50" /></button>
            </h2>
            <div className="grid grid-cols-7 gap-1 justify-items-center">
                {daysOfWeek.map(day => {
                    return <div key={day} className="text-neutral-500">{day}</div>;
                })}
            </div>
            <div tabIndex={0} className="rounded-md focus:bg-neutral-800 focus-within:bg-neutral-800 grid grid-cols-7 gap-1 justify-items-center">
                {arrayOfDays.map((date, index) => {
                    return <button onClick={() => onDateClick(index)}
                        className={dateStyles(index === todayIndex, index === userSelectedDateIndex, arrayOfMonths[index] === 0)} key={index}>
                        {date}
                    </button>;
                })}
            </div >
        </section>
    );
};

export default Calendar;
