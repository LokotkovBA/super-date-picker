import React, { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "~/assets/Arrows";
import SuperDatePicker from "./SuperDatePicker";
import MainButton from "./MainButton";
import RefreshIcon from "~/assets/RefreshIcon";
import Label from "./Label";

type DateRangeInputProps = {
    startDate: Date;
    startDateSetter: (date: Date) => void;
    endDate: Date;
    endDateSetter: (date: Date) => void;
    defaultPicker?: number;
};

const inputStyles =
    "text-center w-44 h-9 py-2 px-3 bg-transparent border-2 border-transparent focus:border-b-sky-600 focus:outline-none dark:focus:border-b-sky-900";

function useShowDate(
    selectedDate: Date,
    setSelectedDate: (date: Date) => void,
) {
    const [showedDate, setShowedDate] = useState(selectedDate);

    const dateSetter = useCallback(
        (newDate: Date) => {
            setShowedDate(newDate);
            setSelectedDate(newDate);
        },
        [setSelectedDate],
    );

    return [showedDate, dateSetter] as const;
}

const DateRangeInput: React.FC<DateRangeInputProps> = ({
    defaultPicker = -1,
    startDate,
    startDateSetter,
    endDate,
    endDateSetter,
}) => {
    const [showedStartDate, setShowedStartDate] = useShowDate(
        startDate,
        startDateSetter,
    );
    const [showedEndDate, setShowedEndDate] = useShowDate(
        endDate,
        endDateSetter,
    );
    const [showPicker, setShowPicker] = useState(defaultPicker);
    const [startDateIsNow, setStartDateIsNow] = useState(false);
    const [endDateIsNow, setEndDateIsNow] = useState(false);

    function refresh() {
        if (startDateIsNow) {
            setShowedStartDate(new Date());
        }
        if (endDateIsNow) {
            setShowedEndDate(new Date());
        }
    }

    function onInputClick(
        event: React.MouseEvent<HTMLInputElement, MouseEvent>,
        pickerNumber: number,
    ) {
        event.stopPropagation();
        setShowPicker(pickerNumber);
    }

    useEffect(() => {
        function hidePicker() {
            setShowPicker(-1);
        }
        document.addEventListener("mousedown", hidePicker);
        return () => {
            document.removeEventListener("mousedown", hidePicker);
        };
    }, []);

    return (
        <>
            <div className="flex items-center gap-2">
                <div className="flex items-center border border-slate-200 bg-neutral-50 dark:border-sky-950 dark:bg-neutral-900 dark:text-neutral-50">
                    <Label>Dates</Label>
                    <input
                        onMouseDown={(event) => onInputClick(event, 0)}
                        value={showedStartDate.toISOString()}
                        readOnly
                        placeholder="start"
                        className={inputStyles}
                        type="text"
                    />
                    <ArrowRight
                        className="fill-neutral-600 dark:fill-neutral-400"
                        size="1rem"
                    />
                    <input
                        onMouseDown={(event) => onInputClick(event, 1)}
                        value={showedEndDate.toISOString()}
                        readOnly
                        placeholder="end"
                        className={inputStyles}
                        type="text"
                    />
                </div>
                <MainButton
                    onClick={refresh}
                    className="flex items-center gap-2 px-5 py-3 leading-none"
                >
                    <RefreshIcon size="1rem" className="fill-white" /> Refresh
                </MainButton>
            </div>
            {showPicker === 0 && (
                <SuperDatePicker
                    dateLabel="Start"
                    defaultMode={0}
                    selectedDate={showedStartDate}
                    setSelectedDate={setShowedStartDate}
                    setDateIsNow={setStartDateIsNow}
                    className="absolute translate-y-12"
                    tailPosition="translate-x-20"
                />
            )}
            {showPicker === 1 && (
                <SuperDatePicker
                    dateLabel="End"
                    defaultMode={0}
                    selectedDate={showedEndDate}
                    setSelectedDate={setShowedEndDate}
                    setDateIsNow={setEndDateIsNow}
                    className="absolute translate-x-64 translate-y-12 md:translate-x-0"
                    tailPosition="translate-x-20 md:translate-x-72"
                />
            )}
        </>
    );
};

export default DateRangeInput;
