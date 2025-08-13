"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import GlassButton from "./ui/glassBtn";
import { scoreMood } from "@/lib/moodScore";

const MAX_LEN = 80;

export default function MoodContent() {
    const [moodInput, setMoodInput] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const len = moodInput.trim().length;
    const isValid = len > 0 && len <= MAX_LEN;

    async function onSubmit(e?: React.FormEvent) {
        e?.preventDefault();

        if (!isValid) {
        setError(len === 0 ? "Please enter a mood." : `Keep it ≤ ${MAX_LEN} characters.`);
        inputRef.current?.focus();
        return;
        }

        setError(null);
        setSubmitting(true);
        try {
        const { mood } = scoreMood(moodInput.trim());
        const q = new URLSearchParams({
            text: moodInput.trim(),
            mood, // optional but handy on the result page
        }).toString();
        router.push(`/result?${q}`);
        } finally {
        setSubmitting(false);
        }
    }

    return (
        <main className="relative isolate w-full overflow-hidden text-white">
            <section className="mx-auto max-w-4xl px-6 text-center sm:px-8">
                <h1 className="mx-auto max-w-2xl text-5xl font-semibold tracking-tight sm:text-6xl">
                    #myAugustMood
                </h1>
                <p className="mx-auto m-4 max-w-xl text-sm text-white/70 sm:text-base">
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

                        <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6">
                        <label htmlFor="mood" className="block text-sm font-medium text-white/80 text-left">
                            What&apos;s your mood?
                        </label>

                        <input
                            id="mood"
                            ref={inputRef}
                            type="text"
                            value={moodInput}
                            onChange={(e) => setMoodInput(e.target.value.slice(0, MAX_LEN))}
                            placeholder='e.g., "late-night train rides", "cozy rain", "soft courage"'
                            className="rounded-xl bg-white/5 ring-1 ring-white/10 px-4 py-3 text-white placeholder-white/40 outline-none focus:ring-white/20"
                            maxLength={MAX_LEN}
                            aria-invalid={!!error}
                            aria-describedby={error ? "mood-error" : undefined}
                        />

                        <div className="flex flex-wrap gap-2">
                            {["nostalgic", "sun-dappled calm", "storm before the bloom", "soft courage"].map(
                            (chip) => (
                                <button
                                key={chip}
                                type="button"
                                onClick={() =>
                                    setMoodInput((m) => (m ? `${m}, ${chip}` : chip).slice(0, MAX_LEN))
                                }
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 hover:bg-white/10"
                                >
                                {chip}
                                </button>
                            )
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/50">{len}/{MAX_LEN}</span>

                            <GlassButton
                                type="submit"
                                onClick={() => onSubmit()}
                                disabled={!isValid || submitting}
                            >
                                {submitting ? "Submitting…" : "See my card"}
                            </GlassButton>
                        </div>

                        {error && (
                            <p id="mood-error" className="text-xs text-red-300">
                                {error}
                            </p>
                        )}
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
