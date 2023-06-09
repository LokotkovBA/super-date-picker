import clsx from "clsx";
import React, { type PropsWithChildren } from "react";

type LabelProps = {
    className?: string;
};

const Label: React.FC<LabelProps & PropsWithChildren> = ({
    className = "",
    children,
}) => {
    return (
        <label
            className={clsx(
                "flex items-center self-stretch bg-slate-200 p-1 text-xs font-semibold dark:border-sky-950 dark:bg-sky-950 dark:text-neutral-200 md:px-3",
                {
                    [className]: !!className,
                },
            )}
            htmlFor="selectedDate"
        >
            {children}
        </label>
    );
};

export default Label;
