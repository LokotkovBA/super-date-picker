
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
    decorators: [(StoryFn) => {
        return <article className="font-sans w-96 bg-neutral-900 text-neutral-50 rounded flex flex-col">
            <StoryFn />
        </article>;
    }]
};

export default meta;
type Story = StoryObj<typeof RelativeTime>;

const MockParent = () => {
    const relativeTimeData = useRelativeTime();
    return <RelativeTime relativeTimeData={relativeTimeData} dateSetter={action("Date set")} />;
};

export const Primary: Story = {
    render: () => <MockParent />
};
