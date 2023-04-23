import React, { useCallback, useState } from "react";
import { ArrowRight } from "~/assets/Arrows";
import SuperDatePicker from "./SuperDatePicker";
import MainButton from "./MainButton";
import RefreshIcon from "~/assets/RefreshIcon";

type DateRangeInputProps = {
    startDate: Date
    startDateSetter: (date: Date) => void
    endDate: Date
    endDateSetter: (date: Date) => void
}

const inputStyles = "text-center w-44 h-9 py-2 px-3 bg-transparent border-2 border-transparent focus:border-b-sky-600 focus:outline-none dark:focus:border-b-sky-900";

function useShowDate(selectedDate: Date, setSelectedDate: (date: Date) => void) {
    const [showedDate, setShowedDate] = useState(selectedDate);

    const dateSetter = useCallback((newDate: Date) => {
        setShowedDate(newDate);
        setSelectedDate(newDate);
    }, [setSelectedDate]);

    return [showedDate, dateSetter] as const;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({ startDate, startDateSetter, endDate, endDateSetter }) => {
    const [showedStartDate, setShowedStartDate] = useShowDate(startDate, startDateSetter);
    const [showedEndDate, setShowedEndDate] = useShowDate(endDate, endDateSetter);
    const [showPicker, setShowPicker] = useState(0);

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="bg-neutral-50 dark:bg-neutral-900 border-slate-300 dark:text-neutral-50 dark:border-sky-950 border flex items-center">
                    <label className="text-sm self-stretch flex items-center bg-slate-300 dark:bg-sky-950 dark:border-sky-950 px-1 py-1 dark:text-neutral-200 font-semibold">Dates</label>
                    <input onClick={() => setShowPicker(0)} value={showedStartDate.toISOString()} placeholder="start" className={inputStyles} type="text" />
                    <ArrowRight className="dark:fill-neutral-400 fill-neutral-600" size="1rem" />
                    <input onClick={() => setShowPicker(1)} value={showedEndDate.toISOString()} placeholder="end" className={inputStyles} type="text" />
                </div>
                <MainButton className="py-3 px-5 leading-none flex items-center gap-2"><RefreshIcon size="1rem" className="fill-white" /> Refresh</MainButton>
            </div>
            {showPicker === 0 && <SuperDatePicker defaultMode={0} selectedDate={showedStartDate} setSelectedDate={setShowedStartDate} />}
            {showPicker === 1 && <SuperDatePicker defaultMode={0} className="translate-x-20" selectedDate={showedEndDate} setSelectedDate={setShowedEndDate} />}
        </>
    );
};

export default DateRangeInput;
