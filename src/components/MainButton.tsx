import clsx from "clsx";
import React, { useState, type PropsWithChildren } from "react";

type MainButtonProps = {
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const MainButton: React.FC<MainButtonProps & PropsWithChildren> = ({
    children,
    onClick,
    className = "",
}) => {
    const [isHolding, setIsHolding] = useState(false);
    return (
        <button
            onMouseUp={() => setIsHolding(false)}
            onMouseDown={() => setIsHolding(true)}
            onClick={onClick}
            className={clsx(
                `rounded bg-sky-700 leading-loose text-white transition-all duration-300 ease-in-out hover:bg-sky-800 hover:underline dark:bg-sky-900 dark:hover:bg-sky-950`,
                {
                    "translate-y-px": isHolding,
                    "hover:-translate-y-px": !isHolding,
                    [className]: !!className
                },
            )}
        >
            {children}
        </button>
    );
};

export default MainButton;
