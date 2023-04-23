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
    decorators: [
        (StoryFn) => {
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
                <div className="flex flex-wrap items-start gap-5">
                    <div className="flex flex-col items-start gap-2">
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    selectedDate: showedDate1,
                                    dateSetter: dateSetter1,
                                }}
                            />
                        </article>
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    defaultMode: 1,
                                    selectedDate: showedDate1,
                                    dateSetter: dateSetter1,
                                }}
                            />
                        </article>
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    defaultMode: 2,
                                    selectedDate: showedDate1,
                                    dateSetter: dateSetter1,
                                }}
                            />
                        </article>
                    </div>
                    <div className="dark flex flex-col items-start gap-2">
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    selectedDate: showedDate2,
                                    dateSetter: dateSetter2,
                                }}
                            />
                        </article>
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    defaultMode: 1,
                                    selectedDate: showedDate2,
                                    dateSetter: dateSetter2,
                                }}
                            />
                        </article>
                        <article className="flex w-64 md:w-96 flex-col rounded border bg-white font-sans text-neutral-900 shadow-lg dark:bg-neutral-900 dark:text-neutral-50">
                            <StoryFn
                                args={{
                                    defaultMode: 2,
                                    selectedDate: showedDate2,
                                    dateSetter: dateSetter2,
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
type Story = StoryObj<typeof Calendar>;

export const Themes: Story = {};
