import React, { useState } from "react";
import Calendar from "./Calendar";
import clsx from "clsx";
import RelativeTime from "./RelativeTime";

export type ModeProps = {
    selectedDate: Date
    dateSetter: (date: Date) => void
}
function buttonStyles(isActive: boolean) {
    return clsx("hover:underline p-2", {
        "text-sky-400 focus:underline bg-opacity-10 focus:bg-sky-950 border-sky-500 border-b-2": isActive,
        "text-neutral-50": !isActive
    });
}

type SuperDatePickerProps = {
    date: Date
    setSelectedDate: (date: Date) => void
    className?: string
}

function parseDate(date: Date) {
    const datePart = date.toDateString().slice(4);
    const timePart = date.toTimeString().slice(0, 8);
    return `${datePart} @ ${timePart}`;
}

const SuperDatePicker: React.FC<SuperDatePickerProps> = ({ date, setSelectedDate }) => {
    const [selectedMode, setSelectedMode] = useState(1);
    const [showedDate, setShowedDate] = useState(date);

    function dateSetter(newDate: Date) {
        setShowedDate(newDate);
        setSelectedDate(newDate);
    }
    return (
        <article className="font-sans w-96 bg-neutral-900 text-neutral-50 rounded flex flex-col">
            <h2 className="grid grid-cols-3">
                <button onClick={() => setSelectedMode(0)} className={buttonStyles(selectedMode === 0)}>Absolute</button>
                <button onClick={() => setSelectedMode(1)} className={buttonStyles(selectedMode === 1)}>Relative</button>
                <button onClick={() => setSelectedMode(2)} className={buttonStyles(selectedMode === 2)}>Now</button>
            </h2>
            {selectedMode === 0 && <Calendar selectedDate={date} dateSetter={dateSetter} />}
            {selectedMode === 1 && <RelativeTime selectedDate={date} dateSetter={dateSetter} />}
            <div className="flex p-2 text-sm items-center">
                <label className="bg-sky-950 border border-sky-950 px-1 py-1 text-neutral-200 font-semibold " htmlFor="selectedDate">Selected date</label>
                <input className="grow bg-transparent border border-sky-950 px-2 py-1" name="selectedDate" disabled={true} value={parseDate(showedDate)} />
            </div>
        </article>
    );
};

export default SuperDatePicker;
