import React, { type PropsWithChildren } from "react";

type MainButtonProps = {
    className?: string
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const MainButton: React.FC<MainButtonProps & PropsWithChildren> = ({ children, onClick, className = "" }) => {
    return (
        <button onClick={onClick} className={`${className} text-white bg-sky-700 dark:bg-sky-900 rounded leading-loose hover:underline transition-all duration-300 ease-in-out hover:bg-sky-800 dark:hover:bg-sky-950 hover:-translate-y-px`}>
            {children}
        </button>
    );
};

export default MainButton;
