import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SuperDatePicker } from "..";

const meta: Meta<typeof SuperDatePicker> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: SuperDatePicker,
};

export default meta;
type Story = StoryObj<typeof SuperDatePicker>;

export const Primary: Story = {
    args: {
        selectedDate: new Date(),
        setSelectedDate: action("Date change")
    }
};
