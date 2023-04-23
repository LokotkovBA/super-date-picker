import React, { useLayoutEffect } from "react";
import Cross from "~/assets/Cross";
import CheckMark from "~/assets/CheckMark";
import clsx from "clsx";
import { options, setTimeRelative, units } from "./utils";
import { type useRelativeTime } from "./hooks";

const inputStyles =
    "w-44 h-9 p-1 border-2 border-neutral-200 focus:border-b-sky-600 dark:bg-neutral-800 focus:outline-none dark:border-neutral-800 dark:focus:border-b-sky-900";

type RelativeTimeProps = {
    dateSetter: (date: Date) => void;
    relativeTimeData: ReturnType<typeof useRelativeTime>;
};
const RelativeTime: React.FC<RelativeTimeProps> = ({
    dateSetter,
    relativeTimeData,
}) => {
    const {
        rounded,
        setRounded,
        selectedOption,
        setSelectedOption,
        diffValue,
        setDiffValue,
        showWarning,
        setShowWarning,
    } = relativeTimeData;

    function onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newDiff = parseInt(event.target.value);
        if (Number.isNaN(newDiff)) {
            setShowWarning(true);
            return;
        }
        setShowWarning(false);
        setDiffValue(newDiff);
    }

    useLayoutEffect(() => {
        const unitIndex = selectedOption % 7;
        const relativeDiff =
            selectedOption === unitIndex ? -diffValue : diffValue;
        setTimeRelative(units[unitIndex], relativeDiff, rounded, dateSetter);
    }, [diffValue, rounded, selectedOption, dateSetter]);

    return (
        <section className="flex flex-col items-start gap-5 p-2">
            <h3 className="grid grid-cols-2 self-stretch">
                <input
                    onChange={onInputChange}
                    defaultValue={diffValue}
                    className={inputStyles}
                    type="number"
                    min={0}
                />
                <select
                    onChange={(event) =>
                        setSelectedOption(parseInt(event.target.value))
                    }
                    defaultValue={selectedOption}
                    className={`place-self-end ${inputStyles}`}
                >
                    {options.map((option, index) => {
                        return (
                            <option value={index} key={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
                {showWarning && (
                    <p className="text-sm text-red-500">Must be a number</p>
                )}
            </h3>
            <div className="flex items-center gap-2">
                <button
                    className={clsx("rounded-xl px-4 py-1", {
                        "bg-sky-600 dark:bg-sky-900": rounded,
                        "bg-neutral-300 dark:bg-neutral-800": !rounded,
                    })}
                    onClick={() => setRounded((prevRounded) => !prevRounded)}
                >
                    <div
                        className={clsx("transition-all ease-in-out", {
                            "translate-x-2": rounded,
                            "-translate-x-2": !rounded,
                        })}
                    >
                        {rounded ? (
                            <CheckMark
                                size="1rem"
                                className="fill-sky-200 dark:fill-sky-500"
                            />
                        ) : (
                            <Cross
                                className="fill-neutral-500 dark:fill-neutral-400"
                                size="1rem"
                            />
                        )}
                    </div>
                </button>
                <span> Round to the {units[selectedOption % 7]}</span>
            </div>
        </section>
    );
};
export default RelativeTime;
