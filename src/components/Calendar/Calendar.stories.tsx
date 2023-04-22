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
        return <article className="font-sans w-96 bg-neutral-900 text-neutral-50 rounded flex flex-col">
            <StoryFn />
        </article>;
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

export const Primary: Story = {
    render: () => <MockParent />
};
