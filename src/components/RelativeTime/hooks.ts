import { useState } from "react";

export function useRelativeTime() {
    const [rounded, setRounded] = useState(false);
    const [selectedOption, setSelectedOption] = useState(1);
    const [diffValue, setDiffValue] = useState(30);
    const [showWarning, setShowWarning] = useState(false);

    return {
        rounded, setRounded,
        selectedOption, setSelectedOption,
        diffValue, setDiffValue,
        showWarning, setShowWarning
    }
}
