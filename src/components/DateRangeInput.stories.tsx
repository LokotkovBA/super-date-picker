import React, { useCallback, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DateRangeInput } from "..";

const meta: Meta<typeof DateRangeInput> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: DateRangeInput,
    decorators: [
        (StoryFn) => {
            const [startDate, setStartDate] = useState(new Date());
            const [endDate, setEndDate] = useState(new Date());

            const startDateSetter = useCallback((date: Date) => {
                setStartDate(date);
                action("Start date set")(date);
            }, []);
            const endDateSetter = useCallback((date: Date) => {
                setEndDate(date);
                action("End date set")(date);
            }, []);

            return (
                <div className="flex flex-wrap items-start gap-5">
                    <div className="flex flex-col gap-2">
                        <StoryFn
                            args={{
                                startDate,
                                startDateSetter,
                                endDate,
                                endDateSetter,
                            }}
                        />
                    </div>
                    <div className="dark flex flex-col gap-2">
                        <StoryFn
                            args={{
                                startDate,
                                startDateSetter,
                                endDate,
                                endDateSetter,
                            }}
                        />
                    </div>
                </div>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof DateRangeInput>;

export const Themes: Story = {
    args: {},
};
