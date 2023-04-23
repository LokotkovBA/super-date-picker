import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "~/assets/Arrows";
import { useCalendar, useTime } from "./hooks";
import { daysOfWeek, hours, months } from "./utils";

type CalendarProps = {
    defaultMode?: number;
    selectedDate: Date;
    dateSetter: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({
    selectedDate,
    dateSetter,
    defaultMode = 0,
}) => {
    const calendarData = useCalendar(selectedDate, dateSetter);
    const [modeSelect, setModeSelect] = useState(defaultMode);
    return (
        <div onClick={(event) => event.stopPropagation()} className="text-xs">
            {modeSelect === 0 && (
                <DatePicker
                    calendarData={calendarData}
                    changeMode={setModeSelect}
                    updateDate={calendarData.updateDate}
                    selectedDate={selectedDate}
                    dateSetter={dateSetter}
                />
            )}
            {modeSelect === 1 && (
                <MonthPicker
                    selectMonth={calendarData.selectMonth}
                    changeMode={setModeSelect}
                    selectedMonth={calendarData.selectedMonth}
                />
            )}
            {modeSelect === 2 && (
                <YearPicker
                    selectYear={calendarData.selectYear}
                    changeMode={setModeSelect}
                    selectedYear={calendarData.selectedYear}
                />
            )}
        </div>
    );
};
export default Calendar;

function dateStyles(
    isToday: boolean,
    isUserSelected: boolean,
    isSelectedMonth: boolean,
) {
    const isTodayNotSelected = !isUserSelected && isToday;
    return clsx(
        "cursor-pointer border-2 duration-200 hover:scale-125 hover:font-bold hover:underline p-1.5 leading-none w-8 text-center",
        {
            "text-sky-600 dark:text-sky-500 font-bold": isTodayNotSelected,
            "bg-sky-600 border-sky-600 text-white dark:bg-sky-700 dark:border-sky-500 rounded":
                isUserSelected,
            "border-transparent": !isUserSelected,
            "text-neutral-400": !isSelectedMonth && !isTodayNotSelected,
        },
    );
}
const arrowStyles =
    "hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg duration-200 hover:scale-125";
const headingTextStyles =
    "text-xl focus:underline hover:text-sky-600 dark:hover:text-sky-500 hover:cursor-pointer";

type DatePickerProps = {
    selectedDate: Date;
    updateDate: () => void;
    calendarData: ReturnType<typeof useCalendar>;
    changeMode: React.Dispatch<React.SetStateAction<number>>;
    dateSetter: (date: Date) => void;
};

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
        userSelectedDateIndex,
    },
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
        <div className="flex justify-between gap-3 pl-3">
            <section className="py-3">
                <h3 className="mb-2 flex gap-2">
                    <button
                        onClick={() => incrementMonth(-1)}
                        className={`mr-auto ${arrowStyles}`}
                    >
                        <ChevronLeft
                            size="1.5rem"
                            className="fill-neutral-900 dark:fill-neutral-50"
                        />
                    </button>
                    <button
                        onClick={() => changeMode(1)}
                        className={`font-medium ${headingTextStyles}`}
                    >
                        {months[selectedMonth]}
                    </button>
                    <button
                        onClick={() => changeMode(2)}
                        className={`font-light text-neutral-500 dark:text-neutral-400 ${headingTextStyles}`}
                    >
                        {selectedYear}
                    </button>
                    <button
                        onClick={() => incrementMonth(1)}
                        className={`ml-auto ${arrowStyles}`}
                    >
                        <ChevronRight
                            size="1.5rem"
                            className="fill-neutral-900 dark:fill-neutral-50"
                        />
                    </button>
                </h3>
                <div className="mb-1 mt-auto grid grid-cols-7 justify-items-center gap-1">
                    {daysOfWeek.map((day) => {
                        return (
                            <div
                                key={day}
                                className="text-neutral-500 dark:text-neutral-400"
                            >
                                {day}
                            </div>
                        );
                    })}
                </div>
                <div
                    tabIndex={0}
                    className="grid grid-cols-7 justify-items-center gap-1 rounded-md focus-within:bg-sky-100 focus:bg-sky-100 dark:focus-within:bg-neutral-800 dark:focus:bg-neutral-800"
                >
                    {arrayOfDays.map((date, index) => {
                        return (
                            <button
                                onClick={() => onDateClick(index)}
                                className={dateStyles(
                                    index === todayIndex,
                                    index === userSelectedDateIndex,
                                    arrayOfMonths[index] === 0,
                                )}
                                key={index}
                            >
                                {date}
                            </button>
                        );
                    })}
                </div>
            </section>
            <TimePicker selecteDate={selectedDate} dateSetter={dateSetter} />
        </div>
    );
};

function timeStyles(isSelected: boolean, isApprox: boolean) {
    return clsx("rounded px-2 cursor-pointer hover:underline border-2", {
        "bg-sky-600 border-sky-600 text-white dark:bg-sky-700 dark:border-sky-500":
            isSelected && !isApprox,
        "bg-sky-200 border-sky-200 dark:bg-neutral-700 dark:border-neutral-700":
            isApprox && isSelected,
        "bg-transparent border-transparent dark:text-neutral-200": !isSelected,
    });
}
type TimePickerProps = {
    selecteDate: Date;
    dateSetter: (date: Date) => void;
};
const TimePicker: React.FC<TimePickerProps> = ({ selecteDate, dateSetter }) => {
    const { halfPast, selectedHour, selectHour, isApprox } = useTime(
        selecteDate,
        dateSetter,
    );
    const listRef = useRef<HTMLUListElement>(null);

    useLayoutEffect(() => {
        const today = new Date();
        const elementId = `#hour${hours[today.getHours()]}${today.getMinutes() > 29 ? "30" : "00"
            }`;
        listRef.current
            ?.querySelector(elementId)
            ?.scrollIntoView({ block: "center" });
    }, []);

    return (
        <section
            tabIndex={0}
            className="flex items-center pr-2 focus:bg-sky-100 dark:focus:bg-neutral-800"
        >
            <ul
                ref={listRef}
                className="flex h-52 flex-col gap-1 overflow-y-scroll pl-4 pr-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300"
            >
                {hours.map((hour, index) => {
                    return (
                        <React.Fragment key={hour}>
                            <li
                                id={`hour${hour}00`}
                                onClick={() => selectHour(index, 0)}
                                className={timeStyles(
                                    selectedHour === index && !halfPast,
                                    isApprox,
                                )}
                            >
                                {hour}:00
                            </li>
                            <li
                                id={`hour${hour}30`}
                                onClick={() => selectHour(index, 30)}
                                className={timeStyles(
                                    selectedHour === index && halfPast,
                                    isApprox,
                                )}
                            >
                                {hour}:30
                            </li>
                        </React.Fragment>
                    );
                })}
            </ul>
        </section>
    );
};

type MonthPickerProps = {
    selectedMonth: number;
    selectMonth: (monthIndex: number) => void;
    changeMode: React.Dispatch<React.SetStateAction<number>>;
};

function monthYearStyle(isSelected: boolean) {
    return clsx("h-6 text-xs rounded my-2 border-2", {
        "text-white bg-sky-600 border-sky-600 dark:bg-sky-700 dark:border-sky-500 font-semibold":
            isSelected,
        "hover:bg-neutral-100 border-transparent dark:hover:bg-neutral-800 dark:text-neutral-200":
            !isSelected,
    });
}

const MonthPicker: React.FC<MonthPickerProps> = ({
    selectMonth,
    changeMode,
    selectedMonth,
}) => {
    function onMonthClick(monthIndex: number) {
        selectMonth(monthIndex);
        changeMode(0);
    }

    return (
        <section className="grid h-60 grid-cols-3 px-2 pt-4">
            {months.map((month, index) => (
                <button
                    key={month}
                    className={monthYearStyle(index === selectedMonth)}
                    onClick={() => onMonthClick(index)}
                >
                    {month}
                </button>
            ))}
        </section>
    );
};

type YearPickerProps = {
    selectYear: (year: number) => void;
    changeMode: React.Dispatch<React.SetStateAction<number>>;
    selectedYear: number;
};

const YearPicker: React.FC<YearPickerProps> = ({
    selectedYear,
    selectYear,
    changeMode,
}) => {
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
        <section className="grid h-60 grid-cols-3 px-2">
            {yearsRange.map((year) => (
                <button
                    key={year}
                    className={monthYearStyle(year === selectedYear)}
                    onClick={() => onYearClick(year)}
                >
                    {year}
                </button>
            ))}
        </section>
    );
};
