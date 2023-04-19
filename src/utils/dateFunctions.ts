export function getCalendarDates(timeStamp: number) {
    const arrayOfDays = new Array<number>(42).fill(0);
    const arrayOfMonths = new Array<number>(42).fill(-1);
    const selectedDate = new Date(timeStamp);
    let selectedDateIndex = setCalendarDates(selectedDate, arrayOfDays, arrayOfMonths);
    const currentDate = new Date();
    if (selectedDate.getMonth() !== currentDate.getMonth() && selectedDate.getFullYear() !== currentDate.getFullYear()) {
        selectedDateIndex = -1;
    }
    return [arrayOfDays, arrayOfMonths, selectedDateIndex] as const;
}

function setCalendarDates(date: Date, arrayOfDays: number[], arrayOfMonths: number[]) {
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

    date.setMonth(date.getMonth() + 2);
    date.setDate(0);
    const lastDateOfCurMonth = date.getDate();

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

