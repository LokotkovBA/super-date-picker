import React, { useLayoutEffect, useState } from "react";
import Cross from "~/assets/Cross";
import CheckMark from "~/assets/CheckMark";
import clsx from "clsx";
import { type ModeProps } from "../SuperDatePicker";
import { options, setTimeRelative, units } from "./utils";

function onChangeRounded(newRounded: boolean, selectedOption: number, diff: number, dateSetter: (date: Date) => void) {
    const unitIndex = selectedOption % 7;
    const relativeDiff = selectedOption === unitIndex ? -diff : diff;
    setTimeRelative(units[unitIndex], relativeDiff, newRounded, dateSetter);
}

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
        setTimeRelative(units[unitIndex], relativeDiff, rounded, dateSetter);
    }

    function onSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const newOption = parseInt(event.target.value);
        setSelectedOption(newOption);
        const unitIndex = newOption % 7;
        const relativeDiff = newOption === unitIndex ? -diffValue : diffValue;
        setTimeRelative(units[unitIndex], relativeDiff, rounded, dateSetter);
    }

    function onRoundedClick() {
        setRounded(prevRounded => !prevRounded);
        onChangeRounded(!rounded, selectedOption, diffValue, dateSetter);
    }

    useLayoutEffect(() => {
        setTimeRelative("minute", -30, false, dateSetter);
    }, [dateSetter]);

    return (
        <section className="p-2 flex flex-col gap-5 items-start">
            <h3 className="grid grid-cols-2 self-stretch">
                <input onChange={onInputChange} defaultValue={diffValue} className={inputStyles} type="number" min={0} />
                <select onChange={onSelectChange} defaultValue="1" className={`place-self-end ${inputStyles}`}>
                    {options.map((option, index) => {
                        return <option value={index} key={option}>{option}</option>;
                    })}
                </select>
                {showWarning && <p className="text-sm text-red-500">Must be a number</p>}
            </h3>
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


