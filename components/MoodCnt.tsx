"use client";

import { useState } from "react";
import GlassButton from "./ui/glassBtn";

export default function MoodContent() {
    const [mood, setMood] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!mood.trim()) return;
        setSubmitting(true);

        try {
        // TODO: hook up your submit logic
        console.log("Submitting mood:", mood);
        } finally {
        setSubmitting(false);
        }
    }

    return (
        <main className="relative isolate w-full overflow-hidden text-white">
            <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
                <h1 className="mx-auto max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                    #myAugustMood
                </h1>

                <p className="mx-auto m-4 max-w-xl text-pretty text-sm text-white/70 sm:text-base">
                    Tell me how August feels and we&apos;ll turn it into something dreamy.
                </p>

                <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-[16px] border border-white/10 bg-[#1F2121]/80 backdrop-blur">
                    <div className="grid gap-0 md:grid-cols-2">
                        <div className="relative hidden overflow-hidden md:block">
                            <img
                                src="/folklore.png"
                                alt="Mood preview"
                                className="absolute inset-0 h-full w-full object-cover contrast-75"
                            />
                            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4 font-mono text-xs text-white/80">
                                <span>Folklore</span>
                                <span className="opacity-50">#myAugustMood</span>
                            </div>
                        </div>

                        <form
                            onSubmit={onSubmit}
                            className="flex flex-col justify-center gap-5 p-5 md:p-8"
                            >
                            <div className="text-left">
                                <label
                                htmlFor="mood"
                                className="block text-sm font-medium text-white/80"
                                >
                                What&apos;s your mood?
                                </label>

                                <div className="mt-2 flex items-center rounded-xl bg-white/5 ring-1 ring-white/10 focus-within:ring-white/20">
                                <input
                                    id="mood"
                                    type="text"
                                    value={mood}
                                    onChange={(e) => setMood(e.target.value)}
                                    placeholder='e.g., "golden-hour wistful", "cozy rain", "fearless"'
                                    className="w-full bg-transparent px-4 py-3 text-base text-white placeholder-white/40 outline-none"
                                    aria-describedby="mood-hint"
                                />
                                </div>

                                <p id="mood-hint" className="mt-2 text-xs text-white/60">
                                A few evocative words work best.
                                </p>
                            </div>

                            <div className="flex flex-wrap justify-start gap-2 text-left">
                                {[
                                    "nostalgic",
                                    "sun-dappled calm",
                                    "storm before the bloom",
                                    "soft courage",
                                ].map((chip) => (
                                <button
                                    key={chip}
                                    type="button"
                                    onClick={() =>
                                    setMood((m) => (m ? `${m}, ${chip}` : chip))
                                    }
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10 hover:border-white/20 transition"
                                >
                                    {chip}
                                </button>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <span className="text-xs text-white/50">
                                    {mood.trim().length}/80
                                </span>

                                <GlassButton href="/">
                                {submitting ? "Submitting…" : "Submit mood"}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                                >
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                                </GlassButton>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
