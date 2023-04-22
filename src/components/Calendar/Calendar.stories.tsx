import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React, { useCallback, useState } from "react";
import Calendar from "./Calendar";

const meta: Meta<typeof Calendar> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: Calendar,
    decorators: [(StoryFn) => {
        const [showedDate1, setShowedDate1] = useState(new Date());
        const [showedDate2, setShowedDate2] = useState(new Date());
        const dateSetter1 = useCallback((date: Date) => {
            setShowedDate1(date);
            action("Date set")(date);
        }, []);
        const dateSetter2 = useCallback((date: Date) => {
            setShowedDate2(date);
            action("Date set")(date);
        }, []);
        return (
            <div className="flex flex-wrap gap-5 items-start">
                <article className="font-sans w-96 bg-white shadow-lg border text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded flex flex-col">
                    <StoryFn args={{ selectedDate: showedDate1, dateSetter: dateSetter1 }} />
                </article>
                <div className="dark">
                    <article className="font-sans w-96 bg-white shadow-lg border text-neutral-900 dark:bg-neutral-900 dark:text-neutral-50 rounded flex flex-col">
                        <StoryFn args={{ selectedDate: showedDate2, dateSetter: dateSetter2 }} />
                    </article>
                </div>
            </div>
        );
    }]
};

export default meta;
type Story = StoryObj<typeof Calendar>;

const MockParent = () => {
    const [showedDate, setShowedDate] = useState(new Date());
    const dateSetter = useCallback((date: Date) => {
        setShowedDate(date);
        action("Date set")(date);
    }, []);
    return <Calendar selectedDate={showedDate} dateSetter={dateSetter} />;
};

export const Themes: Story = {
    render: () => <MockParent />
};
