import React, { useCallback, useState } from "react";
import Calendar from "./Calendar";
import clsx from "clsx";
import RelativeTime from "./RelativeTime";
import { useRelativeTime } from "./RelativeTime/hooks";
import MainButton from "./MainButton";
import Label from "./Label";

function buttonStyles(isActive: boolean) {
    return clsx("hover:underline p-2", {
        "dark:text-sky-400 text-sky-500 focus:underline focus:bg-sky-100 dark:focus:bg-sky-950 border-sky-500 border-b-2": isActive,
        "dark:text-neutral-50 border-b": !isActive
    });
}

type SuperDatePickerProps = {
    dateLabel?: string
    defaultMode?: number
    selectedDate: Date
    setSelectedDate: (date: Date) => void
    className?: string
    setDateIsNow: React.Dispatch<React.SetStateAction<boolean>>
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

const SuperDatePicker: React.FC<SuperDatePickerProps> = ({ className = "", dateLabel = "Selected", setDateIsNow, selectedDate, setSelectedDate, defaultMode = 1 }) => {
    const [selectedMode, setSelectedMode] = useState(defaultMode);
    const [showedDate, setShowedDate] = useState(selectedDate);
    const relativeTimeData = useRelativeTime();

    const dateSetter = useCallback((newDate: Date) => {
        setDateIsNow(false);
        setShowedDate(newDate);
        setSelectedDate(newDate);
    }, [setSelectedDate, setDateIsNow]);

    return (
        <article onClick={(event) => event.stopPropagation()} className={`${className} font-sans w-96 bg-white shadow-lg border text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded flex flex-col`}>
            <h2 className="grid grid-cols-3">
                <button onClick={() => setSelectedMode(0)} className={buttonStyles(selectedMode === 0)}>Absolute</button>
                <button onClick={() => setSelectedMode(1)} className={buttonStyles(selectedMode === 1)}>Relative</button>
                <button onClick={() => setSelectedMode(2)} className={buttonStyles(selectedMode === 2)}>Now</button>
            </h2>
            {selectedMode === 0 && <Calendar dateSetter={dateSetter} selectedDate={showedDate} />}
            {selectedMode === 1 && <RelativeTime dateSetter={dateSetter} relativeTimeData={relativeTimeData} />}
            {selectedMode === 2 && <NowTime setDateIsNow={setDateIsNow} />}
            <div className="flex p-2 text-sm items-center">
                <Label>{dateLabel} date</Label>
                <input className="grow bg-transparent border dark:border-sky-950 px-2 py-1" name="selectedDate" disabled={true} value={parseDate(showedDate)} />
            </div>
        </article>
    );
};

export default SuperDatePicker;

type NowTimeProps = {
    setDateIsNow: React.Dispatch<React.SetStateAction<boolean>>
}

const NowTime: React.FC<NowTimeProps> = ({ setDateIsNow }) => {
    return (
        <section className="p-4 flex flex-col gap-3">
            <h3 className="text-sm">Setting the time to "now" means that on every refresh this time will be set to the time of the refresh.</h3>
            <MainButton onClick={() => setDateIsNow(true)} >Set start date and time to now</MainButton>
        </section>
    );
};
