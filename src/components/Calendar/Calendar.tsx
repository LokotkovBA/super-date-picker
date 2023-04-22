import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowLeft, ArrowRight } from "~/assets/Arrows";
import { useCalendar, useTime } from "./hooks";
import { daysOfWeek, hours, months } from "./utils";
import { type ModeProps } from "../SuperDatePicker";

const Calendar: React.FC<ModeProps> = ({ selectedDate, dateSetter }) => {
    const calendarData = useCalendar(selectedDate, dateSetter);
    const [modeSelect, setModeSelect] = useState(0);
    return <div onClick={(event) => event.stopPropagation()} className="text-xs">
        {modeSelect === 0 && <DatePicker calendarData={calendarData} changeMode={setModeSelect} updateDate={calendarData.updateDate} selectedDate={selectedDate} dateSetter={dateSetter} />}
        {modeSelect === 1 && <MonthPicker selectMonth={calendarData.selectMonth} changeMode={setModeSelect} selectedMonth={calendarData.selectedMonth} />}
        {modeSelect === 2 && <YearPicker selectYear={calendarData.selectYear} changeMode={setModeSelect} selectedYear={calendarData.selectedYear} />}
    </div>;
};
export default Calendar;

function dateStyles(isToday: boolean, isUserSelected: boolean, isSelectedMonth: boolean) {
    const isTodayNotSelected = !isUserSelected && isToday;
    return clsx("cursor-pointer border-2 duration-200 hover:scale-125 hover:font-bold hover:underline p-1.5 leading-none w-8 text-center",
        {
            "text-sky-500 font-bold": isTodayNotSelected,
            "bg-sky-700 border-sky-500 rounded": isUserSelected,
            "border-transparent": !isUserSelected,
            "text-gr neutral-50": isSelectedMonth && !isTodayNotSelected,
            "text-neutral-400": !isSelectedMonth && !isTodayNotSelected
        });
}
const arrowStyles = "hover:bg-neutral-800 rounded-lg";
const headingTextStyles = "text-xl focus:underline hover:text-sky-500 hover:cursor-pointer";

type DatePickerProps = {
    selectedDate: Date
    updateDate: () => void
    calendarData: ReturnType<typeof useCalendar>
    changeMode: React.Dispatch<React.SetStateAction<number>>
    dateSetter: (date: Date) => void
}

const DatePicker: React.FC<DatePickerProps> = ({
    dateSetter,
    selectedDate,
    updateDate,
    changeMode,
    calendarData: {
        dateData: { arrayOfDays, todayIndex, arrayOfMonths },
        selectedMonth,
        selectedYear,
        setUserSelectedDateIndex,
        incrementMonth,
        userSelectedDateIndex
    }
}) => {
    function onDateClick(index: number) {
        const userSelectedDay = arrayOfDays[index];
        if (!arrayOfMonths[index]) {
            selectedDate.setDate(userSelectedDay);
            updateDate();
            setUserSelectedDateIndex(index);
            return;
        }

        incrementMonth(arrayOfMonths[index], userSelectedDay);
    }

    return (
        <div className="flex gap-3 pl-3">
            <section className="py-3">
                <h3 className="flex gap-2 mb-2">
                    <button onClick={() => incrementMonth(-1)} className={`mr-auto ${arrowStyles}`}><ArrowLeft size="1.5rem" className="fill-neutral-50" /></button>
                    <button onClick={() => changeMode(1)} className={`font-medium ${headingTextStyles}`}>{months[selectedMonth]}</button>
                    <button onClick={() => changeMode(2)} className={`font-light text-neutral-400 ${headingTextStyles}`}>{selectedYear}</button>
                    <button onClick={() => incrementMonth(1)} className={`ml-auto ${arrowStyles}`}><ArrowRight size="1.5rem" className="fill-neutral-50" /></button>
                </h3>
                <div className="grid grid-cols-7 gap-1 justify-items-center mt-auto mb-1">
                    {daysOfWeek.map(day => {
                        return <div key={day} className="text-neutral-400">{day}</div>;
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
            <TimePicker selecteDate={selectedDate} dateSetter={dateSetter} />
        </div>
    );
};

function timeStyles(isSelected: boolean, isApprox: boolean) {
    return clsx("rounded px-2 cursor-pointer hover:underline border-2", {
        "bg-sky-700 border-sky-500": isSelected && !isApprox,
        "bg-neutral-700 border-neutral-700": isApprox && isSelected,
        "bg-transparent border-transparent": !isSelected
    });
}
type TimePickerProps = {
    selecteDate: Date
    dateSetter: (date: Date) => void
}
const TimePicker: React.FC<TimePickerProps> = ({ selecteDate, dateSetter }) => {
    const { halfPast, selectedHour, selectHour, isApprox } = useTime(selecteDate, dateSetter);
    const listRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const today = new Date();
        const elementId = `#hour${hours[today.getHours()]}${today.getMinutes() > 29 ? "30" : "00"}`;
        listRef.current?.querySelector(elementId)?.scrollIntoView({ block: "center" });
    }, []);

    return (
        <section tabIndex={0} className="focus:bg-neutral-800 flex items-center pr-2" >
            <ul ref={listRef} className="h-52 flex flex-col gap-1 overflow-y-scroll pl-4 pr-6 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                {hours.map((hour, index) => {
                    return (
                        <React.Fragment key={hour}>
                            <li id={`hour${hour}00`} onClick={() => selectHour(index, 0)} className={timeStyles(selectedHour === index && !halfPast, isApprox)}>{hour}:00</li>
                            <li id={`hour${hour}30`} onClick={() => selectHour(index, 30)} className={timeStyles(selectedHour === index && halfPast, isApprox)}>{hour}:30</li>
                        </React.Fragment>
                    );
                })}
            </ul>
        </section>
    );
};

type MonthPickerProps = {
    selectedMonth: number
    selectMonth: (monthIndex: number) => void
    changeMode: React.Dispatch<React.SetStateAction<number>>
}

const MonthPicker: React.FC<MonthPickerProps> = ({ selectMonth, changeMode, selectedMonth }) => {
    function onMonthClick(monthIndex: number) {
        selectMonth(monthIndex);
        changeMode(0);
    }

    return (
        <section className="h-60 grid grid-cols-3 pt-4 px-2">
            {months.map((month, index) => (
                <button key={month} className={clsx("h-6 text-xs rounded my-2", {
                    "bg-sky-700 font-semibold": index === selectedMonth,
                    "hover:bg-neutral-800 text-neutral-400": index !== selectedMonth
                })} onClick={() => onMonthClick(index)}>
                    {month}
                </button>
            ))}
        </section>
    );
};

type YearPickerProps = {
    selectYear: (year: number) => void
    changeMode: React.Dispatch<React.SetStateAction<number>>
    selectedYear: number
}

const YearPicker: React.FC<YearPickerProps> = ({ selectedYear, selectYear, changeMode }) => {
    const yearsRange = useMemo(() => {
        let startYear = selectedYear - 7;
        const range = new Array<number>(15);
        for (let i = 0; i < 15; i++) {
            range[i] = startYear;
            startYear++;
        }
        return range;
    }, [selectedYear]);

    function onYearClick(year: number) {
        selectYear(year);
        changeMode(0);
    }

    return (
        <section className="h-60 grid grid-cols-3 px-2">
            {yearsRange.map((year) => (
                <button key={year} className={clsx("w-32 h-6 text-xs rounded my-2", {
                    "bg-sky-700 font-semibold": year === selectedYear,
                    "hover:bg-neutral-800 text-neutral-400": year !== selectedYear
                })} onClick={() => onYearClick(year)}>
                    {year}
                </button>
            ))}
        </section>
    );
};
