import clsx from "clsx";
import React, { PropsWithChildren } from "react";

type LabelProps = {
    className?: string
}

const Label: React.FC<LabelProps & PropsWithChildren> = ({ className, children }) => {
    return <label className={clsx("text-xs self-stretch flex items-center bg-slate-200 dark:bg-sky-950 dark:border-sky-950 px-3 py-1 dark:text-neutral-200 font-semibold", {
        className: !!className
    })} htmlFor="selectedDate">
        {children}
    </label>
};

export default Label;
