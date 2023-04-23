import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { SuperDatePicker } from "..";

const meta: Meta<typeof SuperDatePicker> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: SuperDatePicker,
    decorators: [(StoryFn) => {
        return (
            <div className="flex flex-wrap gap-5 items-start">
                <div className="flex flex-col gap-2">
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), defaultMode: 0, selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), defaultMode: 2, selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                </div>
                <div className="dark flex flex-col gap-2">
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), defaultMode: 0, selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                    <StoryFn args={{ setDateIsNow: action("Is date set to now"), defaultMode: 2, selectedDate: new Date(), setSelectedDate: action("Date set") }} />
                </div>
            </div>
        );
    }]

};

export default meta;
type Story = StoryObj<typeof SuperDatePicker>;

export const Themes: Story = {
    args: {
    }
};
