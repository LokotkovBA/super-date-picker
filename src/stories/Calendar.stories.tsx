import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import Calendar from "../components/Calendar";

const meta: Meta<typeof Calendar> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    title: "Calendar",
    component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Primary: Story = {
    render: () => <Calendar selectedDate={123} />,
};
