export function startOfMonth(timeStamp: number) {
    const date = new Date(timeStamp);
    date.setDate(1);
    date.setHours(0, 0, 0, 0);
    return date;
}
export function endOfMonth(timeStamp: number) {
    const date = new Date(timeStamp);
    const month = date.getMonth();
    date.setFullYear(date.getFullYear(), month + 1, 0);
    date.setHours(23, 59, 99, 999);
    return date;
}
