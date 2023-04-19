export function startOfMonth(timeStamp: number) {
    const date = new Date(timeStamp);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
}

export function endOfMonth(timeStamp: number) {
    const date = new Date(timeStamp);
    const month = date.getMonth();
    date.setMonth(month + 1, 0);
    return date;
}

export function getCalendarDates(timeStamp: number) {
    const arrayOfDays = new Array<number>(42).fill(0);
    const arrayOfMonths = new Array<number>(42).fill(-1);
    const selectedDateIndex = setCalendarDates(timeStamp, arrayOfDays, arrayOfMonths);
    return [arrayOfDays, arrayOfMonths, selectedDateIndex] as const;
}

function setCalendarDates(timeStamp: number, arrayOfDays: number[], arrayOfMonths: number[]) {
    const date = new Date(timeStamp);
    const selectedDate = date.getDate();
    let selectedDateIndex = 0;
    date.setDate(0);
    const toMonday = date.getDay() - 1;
    const lastDateOfPrevMonth = date.getDate();
    if (toMonday >= 0) {
        date.setDate(lastDateOfPrevMonth - toMonday);
        arrayOfDays[toMonday] = lastDateOfPrevMonth;
        arrayOfMonths[toMonday] = -1;
    } else {
        date.setDate(lastDateOfPrevMonth - 6);
        arrayOfDays[6] = lastDateOfPrevMonth;
        arrayOfMonths[6] = -1;
    }
    const firstDay = date.getDate();
    let i = 0;

    while (arrayOfDays[i] === 0) {
        arrayOfDays[i] = firstDay + i;
        arrayOfMonths[i] = -1;
        i++;
    }

    const curEndOfMonth = endOfMonth(timeStamp);
    const lastDateOfCurMonth = curEndOfMonth.getDate();

    let curDate = 1;
    i++;
    while (curDate <= lastDateOfCurMonth) {
        arrayOfDays[i] = curDate;
        arrayOfMonths[i] = 0;
        if (curDate === selectedDate) {
            selectedDateIndex = i;
        }
        curDate++;
        i++;
    }
    curDate = 1;
    while (i < arrayOfDays.length) {
        arrayOfDays[i] = curDate;
        arrayOfMonths[i] = 1;
        curDate++;
        i++;
    }
    return selectedDateIndex;
}

