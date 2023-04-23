export const options = [
    "Seconds ago",
    "Minutes ago",
    "Hours ago",
    "Days ago",
    "Weeks ago",
    "Months ago",
    "Years ago",
    "Seconds from now",
    "Minutes from now",
    "Hours from now",
    "Days from now",
    "Weeks from now",
    "Months from now",
    "Years from now",
] as const;

export const units = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
] as const;

export function setTimeRelative(
    unit: (typeof units)[number],
    value: number,
    rounded: boolean,
    dateSetter: (date: Date) => void,
) {
    const date = new Date();
    let diff = value;
    switch (unit) {
        case "year":
            date.setFullYear(date.getFullYear() + diff);
            diff = rounded ? -date.getMonth() : 0;
        // falls through
        case "month":
            date.setMonth(date.getMonth() + diff);
            diff = rounded ? -date.getDate() + 1 : 0;
        // falls through
        case "day":
            date.setDate(date.getDate() + diff);
            diff = 0;
        // falls through
        case "week":
            if (diff !== 0) {
                let currentWeekDay = date.getDay() - 1;
                if (currentWeekDay < 0) {
                    currentWeekDay = 6;
                }
                const weekDiff = diff * 7 - (rounded ? currentWeekDay : 0);
                date.setDate(date.getDate() + weekDiff);
            }
            diff = rounded ? -date.getHours() : 0;
        // falls through
        case "hour":
            date.setHours(date.getHours() + diff);
            diff = rounded ? -date.getMinutes() : 0;
        // falls through
        case "minute":
            date.setMinutes(date.getMinutes() + diff);
            diff = rounded ? -date.getSeconds() : 0;
        // falls through
        case "second":
            date.setSeconds(date.getSeconds() + diff);
    }
    if (rounded) {
        date.setMilliseconds(0);
    }
    dateSetter(date);
}
