import React, { useLayoutEffect, useState } from "react";
import { type ModeProps } from "./SuperDatePicker";
import Cross from "~/assets/Cross";
import CheckMark from "~/assets/CheckMark";
import clsx from "clsx";


const inputStyles = "w-44 h-9 p-1 bg-neutral-800 focus:outline-none border-b-2 border-neutral-800 focus:border-sky-950";
const RelativeTime: React.FC<ModeProps> = ({ dateSetter }) => {
    const [rounded, setRounded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [diffValue, setDiffValue] = useState(30);
    const [showWarning, setShowWarning] = useState(false);

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newDiff = parseInt(event.target.value);
        if (Number.isNaN(newDiff)) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        const unitIndex = selectedOption % 7;
        setDiffValue(newDiff);
        const relativeDiff = selectedOption === unitIndex ? -newDiff : newDiff;
        setRelative(units[unitIndex], relativeDiff, rounded, dateSetter);
    }

    function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newOption = parseInt(event.target.value);
        setSelectedOption(newOption);
        const unitIndex = newOption % 7;
        const relativeDiff = newOption === unitIndex ? -diffValue : diffValue;
        setRelative(units[unitIndex], relativeDiff, rounded, dateSetter);
    }

    function onRoundedClick() {
        setRounded(prevRounded => !prevRounded);
        onChangeRounded(!rounded, selectedOption, diffValue, dateSetter);
    }

    useLayoutEffect(() => {
        setRelative("minute", -30, false, dateSetter);
    }, [dateSetter]);

    return (
        <section className="p-2 flex flex-col gap-5 items-start">
            <h2 className="grid grid-cols-2 self-stretch">
                <input onChange={onInputChange} defaultValue={diffValue} className={inputStyles} type="number" min={0} />
                <select onChange={onSelectChange} defaultValue="1" className={`place-self-end ${inputStyles}`}>
                    {options.map((option, index) => {
                        return <option value={index} key={option}>{option}</option>;
                    })}
                </select>
                {showWarning && <p className="text-sm text-red-500">Must be a number</p>}
            </h2>
            <div className="flex items-center gap-2">
                <button className={clsx("py-1 px-4 rounded-xl", {
                    "bg-sky-900": rounded,
                    "bg-neutral-800": !rounded
                })} onClick={onRoundedClick}>
                    <div className={clsx("transition-all ease-in-out", {
                        "translate-x-2": rounded,
                        "-translate-x-2": !rounded
                    })}>
                        {rounded ? <CheckMark size="1rem" className="fill-sky-500" /> : <Cross className="fill-neutral-400" size="1rem" />}
                    </div>
                </button>
                <span> Round to the {units[selectedOption % 7]}</span>
            </div>
        </section>
    );
};
export default RelativeTime;

function onChangeRounded(newRounded: boolean, selectedOption: number, diff: number, dateSetter: (date: Date) => void) {
    const unitIndex = selectedOption % 7;
    const relativeDiff = selectedOption === unitIndex ? -diff : diff;
    setRelative(units[unitIndex], relativeDiff, newRounded, dateSetter);
}

function setRelative(unit: typeof units[number], value: number, rounded: boolean, dateSetter: (date: Date) => void) {
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

const options = [
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

const units = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
] as const;
