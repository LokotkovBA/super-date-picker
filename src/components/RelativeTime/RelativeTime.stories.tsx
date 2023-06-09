import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";
import RelativeTime from "./RelativeTime";
import { useRelativeTime } from "./hooks";

const meta: Meta<typeof RelativeTime> = {
    /* 👇 The title prop is optional.
     * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
     * to learn how to generate automatic titles
     */
    component: RelativeTime,
    decorators: [
        (StoryFn) => {
            const relativeTimeData1 = useRelativeTime();
            const relativeTimeData2 = useRelativeTime();
            return (
                <div className="flex flex-wrap gap-5">
                    <article className="flex w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                        <StoryFn
                            args={{
                                relativeTimeData: relativeTimeData1,
                                dateSetter: action("Date set"),
                            }}
                        />
                    </article>
                    <div className="dark">
                        <article className="flex w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    relativeTimeData: relativeTimeData2,
                                    dateSetter: action("Date set"),
                                }}
                            />
                        </article>
                    </div>
                </div>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof RelativeTime>;

export const Themes: Story = {
    args: {
        dateSetter: action("Date change"),
    },
};
