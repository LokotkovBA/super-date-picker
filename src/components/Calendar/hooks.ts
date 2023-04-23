import { useEffect, useState } from "react";
import { getCalendarDates } from "./utils";

export function useCalendar(date: Date, dateSetter: (date: Date) => void) {
    const [selectedMonth, setSelectedMonth] = useState(date.getMonth());
    const [userSelectedDateIndex, setUserSelectedDateIndex] = useState(0);
    const [dateData, setDateData] = useState(() => {
        const dateData = getCalendarDates(date);
        setUserSelectedDateIndex(dateData.todayIndex);
        return dateData;
    });

    useEffect(() => {
        const newDateData = getCalendarDates(date);
        setUserSelectedDateIndex(newDateData.userSelectedDay);
        setDateData(newDateData);
        setSelectedMonth(date.getMonth());
    }, [date]);

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
        updateDate();
    }

    function selectMonth(monthIndex: number) {
        date.setMonth(monthIndex);
        if (date.getMonth() !== monthIndex) {
            date.setDate(0);
        }
        updateDate();
    }

    function selectYear(year: number) {
        const curMonth = date.getMonth();
        date.setFullYear(year);
        if (curMonth !== date.getMonth()) {
            date.setDate(0);
        }
        updateDate();
    }

    function updateDate() {
        dateSetter(new Date(date.toUTCString()));
    }

    return {
        updateDate,
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

export function useTime(date: Date, dateSetter: (date: Date) => void) {
    const [selectedHour, setSelectedHour] = useState(date.getHours());
    const [halfPast, setHalfPast] = useState(date.getMinutes() > 29);
    const [isApprox, setIsApprox] = useState(true);

    function setStates(hours: number, minutes: number, seconds: number) {
        setSelectedHour(hours);
        setHalfPast(minutes > 29);
        date.setHours(hours, minutes, seconds);
        updateDate();
    }

    function selectHour(hours: number, minutes: number) {
        setStates(hours, minutes, 0);
        setIsApprox(false);
    }

    function setTime(hours: number, minutes?: number, seconds?: number) {
        setStates(
            hours,
            minutes ? minutes : date.getMinutes(),
            seconds ? seconds : date.getSeconds(),
        );
        setIsApprox(true);
    }

    function updateDate() {
        dateSetter(new Date(date.toUTCString()));
    }

    return {
        selectedHour,
        halfPast,
        selectHour,
        setTime,
        isApprox,
    } as const;
}
