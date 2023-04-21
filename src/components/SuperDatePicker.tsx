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

const SuperDatePicker: React.FC<SuperDatePickerProps> = ({ date, setSelectedDate }) => {
    const [selectedMode, setSelectedMode] = useState(1);

    return (
        <article className="font-sans w-96 bg-neutral-900 text-neutral-50 flex flex-col">
            <h2 className="grid grid-cols-3">
                <button onClick={() => setSelectedMode(0)} className={buttonStyles(selectedMode === 0)}>Absolute</button>
                <button onClick={() => setSelectedMode(1)} className={buttonStyles(selectedMode === 1)}>Relative</button>
                <button onClick={() => setSelectedMode(2)} className={buttonStyles(selectedMode === 2)}>Now</button>
            </h2>
            {selectedMode === 0 && <Calendar selectedDate={date} dateSetter={setSelectedDate} />}
            {selectedMode === 1 && <RelativeTime selectedDate={date} dateSetter={setSelectedDate} />}
        </article>
    );
};

export default SuperDatePicker;
