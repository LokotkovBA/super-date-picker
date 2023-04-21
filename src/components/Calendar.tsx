import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
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
            "text-neutral-400": !isSelectedMonth && !isTodayNotSelected
        });
}
const arrowStyles = "hover:bg-neutral-800 rounded-lg";
const headingTextStyles = "text-xl focus:underline hover:text-sky-500 hover:cursor-pointer";

function useCalendar(date: Date) {
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [userSelectedDateIndex, setUserSelectedDateIndex] = useState(0);
    const [dateData, setDateData] = useState(() => {
        const dateData = getCalendarDates(date);
        setUserSelectedDateIndex(dateData.todayIndex);
        return dateData;
    });

    function incrementMonth(dif: number, userSelectedDay?: number) {
        let newMonth = date.getMonth() + dif;
        if (newMonth < 0) {
            newMonth = 11;
            date.setFullYear(date.getFullYear() - 1);
        } else if (newMonth > 11) {
            newMonth = 0;
            date.setFullYear(date.getFullYear() + 1);
        }
        date.setMonth(newMonth);
        if (date.getMonth() !== newMonth) {
            date.setDate(0);
        }
        if (userSelectedDay) {
            date.setDate(userSelectedDay);
        }
        const newDateData = getCalendarDates(date);
        setUserSelectedDateIndex(newDateData.userSelectedDay);
        setDateData(newDateData);
        setSelectedMonth(newMonth);
    }

    function selectMonth(monthIndex: number) {
        date.setMonth(monthIndex);
        if (date.getMonth() !== monthIndex) {
            date.setDate(0);
        }
        const newDateData = getCalendarDates(date);
        setUserSelectedDateIndex(newDateData.userSelectedDay);
        setDateData(newDateData);
        setSelectedMonth(monthIndex);
    }

    function selectYear(year: number) {
        const curMonth = date.getMonth();
        date.setFullYear(year);
        if (curMonth !== date.getMonth()) {
            date.setDate(0);
        }
        const newDateData = getCalendarDates(date);
        setUserSelectedDateIndex(newDateData.userSelectedDay);
        setDateData(newDateData);
    }

    return {
        dateData,
        selectedMonth,
        incrementMonth,
        selectMonth,
        userSelectedDateIndex,
        setUserSelectedDateIndex,
        selectYear,
        selectedYear: date.getFullYear(),
    } as const;
}


type CalendarProps = {
    selectedDate: Date
}
const Calendar: React.FC<CalendarProps> = ({ selectedDate }) => {
    const calendarData = useCalendar(selectedDate);
    const [modeSelect, setModeSelect] = useState(0);
    return <article className="font-sans w-fit text-xs bg-neutral-900 text-neutral-50">
        {modeSelect === 0 && <DatePicker calendarData={calendarData} changeMode={setModeSelect} selectedDate={selectedDate} />}
        {modeSelect === 1 && <MonthPicker selectMonth={calendarData.selectMonth} changeMode={setModeSelect} selectedMonth={calendarData.selectedMonth} />}
        {modeSelect === 2 && <YearPicker selectYear={calendarData.selectYear} changeMode={setModeSelect} selectedYear={calendarData.selectedYear} />}
    </article>;
};

type DatePickerProps = {
    selectedDate: Date
    calendarData: ReturnType<typeof useCalendar>
    changeMode: React.Dispatch<React.SetStateAction<number>>
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, changeMode, calendarData: {
    dateData: { arrayOfDays, todayIndex, arrayOfMonths },
    selectedMonth,
    selectedYear,
    setUserSelectedDateIndex,
    incrementMonth,
    userSelectedDateIndex
} }) => {
    function onDateClick(index: number) {
        const userSelectedDay = arrayOfDays[index];
        if (!arrayOfMonths[index]) {
            selectedDate.setDate(userSelectedDay);
            setUserSelectedDateIndex(index);
            return;
        }

        incrementMonth(arrayOfMonths[index], userSelectedDay);
    }
    return (
        <section className="flex gap-3 pl-3">
            <section className="py-3">
                <h2 className="flex gap-2 mb-2">
                    <button onClick={() => incrementMonth(-1)} className={`mr-auto ${arrowStyles}`}><ArrowLeft size="1.5rem" color="fill-neutral-50" /></button>
                    <button onClick={() => changeMode(1)} className={`font-medium ${headingTextStyles}`}>{months[selectedMonth]}</button>
                    <button onClick={() => changeMode(2)} className={`font-light text-neutral-400 ${headingTextStyles}`}>{selectedYear}</button>
                    <button onClick={() => incrementMonth(1)} className={`ml-auto ${arrowStyles}`}><ArrowRight size="1.5rem" color="fill-neutral-50" /></button>
                </h2>
                <div className="grid grid-cols-7 gap-1 justify-items-center mt-auto">
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
            <TimePicker selecteDate={selectedDate} />
        </section>
    );
};

const hours = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
];
function useTime(date: Date) {
    const [selectedHour, setSelectedHour] = useState(date.getHours());
    const [halfPast, setHalfPast] = useState(date.getMinutes() > 29);
    const [isApprox, setIsApprox] = useState(true);
    function setStates(hours: number, minutes: number, seconds: number) {
        setSelectedHour(hours);
        setHalfPast(minutes > 29);
        date.setHours(hours, minutes, seconds);
    }
    function selectHour(hours: number, minutes: number) {
        setStates(hours, minutes, 0);
        setIsApprox(false);
    }
    function setTime(hours: number, minutes?: number, seconds?: number) {
        setStates(hours, minutes ? minutes : date.getMinutes(), seconds ? seconds : date.getSeconds());
        setIsApprox(true);
    }
    return {
        selectedHour,
        halfPast,
        selectHour,
        setTime,
        isApprox
    } as const;
}
type TimePickerProps = {
    selecteDate: Date
}
function timeStyles(isSelected: boolean, isApprox: boolean) {
    return clsx("rounded px-2 cursor-pointer hover:underline border-2", {
        "bg-sky-700 border-sky-500": isSelected && !isApprox,
        "bg-neutral-700 border-neutral-700": isApprox && isSelected,
        "bg-transparent border-transparent": !isSelected
    });
}
const TimePicker: React.FC<TimePickerProps> = ({ selecteDate }) => {
    const { halfPast, selectedHour, selectHour, isApprox } = useTime(selecteDate);
    const listRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const elementId = `#hour${hours[selecteDate.getHours()]}${selecteDate.getMinutes() > 29 ? "30" : "00"}`;
        listRef.current?.querySelector(elementId)?.scrollIntoView({ block: "center" });
    }, [selecteDate]);

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
        <section className="grid grid-cols-3 px-2">
            {months.map((month, index) => (
                <button className={clsx("w-32 h-6 text-xs rounded my-2", {
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
        <section className="grid grid-cols-3 px-2">
            {yearsRange.map((year) => (
                <button className={clsx("w-32 h-6 text-xs rounded my-2", {
                    "bg-sky-700 font-semibold": year === selectedYear,
                    "hover:bg-neutral-800 text-neutral-400": year !== selectedYear
                })} onClick={() => onYearClick(year)}>
                    {year}
                </button>
            ))}
        </section>
    );
};
export default Calendar;
