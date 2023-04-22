import React, { useCallback, useState } from "react";
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
    selectedDate: Date
    setSelectedDate: (date: Date) => void
    className?: string
}

function parseDate(date: Date) {
    const datePart = date.toDateString().slice(4);
    const hours = date.getHours();
    let hoursPart = hours.toString();
    if (hours < 10) {
        hoursPart = `0${hoursPart}`;
    }
    const mmssmsPart = date.toISOString().slice(13, -1);
    return `${datePart} @ ${hoursPart}${mmssmsPart}`;
}

const SuperDatePicker: React.FC<SuperDatePickerProps> = ({ selectedDate, setSelectedDate }) => {
    const [selectedMode, setSelectedMode] = useState(1);
    const [showedDate, setShowedDate] = useState(selectedDate);

    const dateSetter = useCallback((newDate: Date) => {
        setShowedDate(newDate);
        setSelectedDate(newDate);
    }, [setSelectedDate]);

    return (
        <article className="font-sans w-96 bg-neutral-900 text-neutral-50 rounded flex flex-col">
            <h2 className="grid grid-cols-3">
                <button onClick={() => setSelectedMode(0)} className={buttonStyles(selectedMode === 0)}>Absolute</button>
                <button onClick={() => setSelectedMode(1)} className={buttonStyles(selectedMode === 1)}>Relative</button>
                <button onClick={() => setSelectedMode(2)} className={buttonStyles(selectedMode === 2)}>Now</button>
            </h2>
            {selectedMode === 0 && <Calendar selectedDate={showedDate} dateSetter={dateSetter} />}
            {selectedMode === 1 && <RelativeTime selectedDate={selectedDate} dateSetter={dateSetter} />}
            {selectedMode === 2 && <NowTime dateSetter={dateSetter} />}
            <div className="flex p-2 text-sm items-center">
                <label className="bg-sky-950 border border-sky-950 px-1 py-1 text-neutral-200 font-semibold" htmlFor="selectedDate">Selected date</label>
                <input className="grow bg-transparent border border-sky-950 px-2 py-1" name="selectedDate" disabled={true} value={parseDate(showedDate)} />
            </div>
        </article>
    );
};

export default SuperDatePicker;

type NowTimeProps = {
    dateSetter: (date: Date) => void
}

const NowTime: React.FC<NowTimeProps> = ({ dateSetter }) => {
    return (
        <section className="p-4 flex flex-col gap-3">
            <h3 className="text-sm">Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.</h3>
            <button onClick={() => dateSetter(new Date())} className="bg-sky-900 rounded leading-loose hover:underline transition-all duration-300 ease-in-out hover:bg-sky-950 hover:-translate-y-px">Set start date and time to now</button>
        </section>
    );
};
