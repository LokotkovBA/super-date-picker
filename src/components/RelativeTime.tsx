import React, { useState } from "react";
import { type ModeProps } from "./SuperDatePicker";
import Cross from "~/assets/Cross";
import CheckMark from "~/assets/CheckMark";
import clsx from "clsx";


const inputStyles = "w-44 bg-neutral-800 p-1";
const RelativeTime: React.FC<ModeProps> = ({ selectedDate, dateSetter }) => {
    const [rounded, setRounded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);

    return (
        <section className="p-2 flex flex-col gap-5 items-start">
            <h2 className="flex justify-around self-stretch">
                <input defaultValue={30} className={inputStyles} type="number" />
                <select onChange={(event) => setSelectedOption(parseInt(event.target.value))} defaultValue="1" className={inputStyles}>
                    {options.map((option, index) => {
                        return <option value={index} key={option}>{option}</option>;
                    })}
                </select>
            </h2>
            <div className="flex items-center gap-2">
                <button className={clsx("py-1 px-4 rounded-xl", {
                    "bg-sky-900": rounded,
                    "bg-neutral-800": !rounded
                })} onClick={() => setRounded(prev => !prev)}>
                    <div className={clsx("transition-all ease-in-out", {
                        "translate-x-2": rounded,
                        "-translate-x-2": !rounded
                    })}>
                        {rounded ? <CheckMark size="1rem" className="fill-sky-500" /> : <Cross className="fill-neutral-400" size="1rem" />}
                    </div>
                </button>
                <span> Round to the {roundText[selectedOption % 7]}</span>
            </div>
        </section>
    );
};
export default RelativeTime;

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
];

const roundText = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
];
