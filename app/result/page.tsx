"use client";

import { MOODS, type MoodKey } from "@/lib/mood";
import { useSearchParams } from "next/navigation";

export default function ResultPage() {
    const searchParams = useSearchParams();
    const text = (searchParams.get("text") ?? "").toString();
    const moodKey = (searchParams.get("mood") as MoodKey) || "BITTERSWEET";
    console.log(text, moodKey);
    const cfg = MOODS[moodKey];

    return (
        <main className="min-h-screen flex items-center justify-center bg-neutral-50 p-6">
        <div
            className="w-full max-w-md h-[520px] rounded-3xl relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,.25)]"
            style={{
            backgroundImage:
                `radial-gradient(circle at 30% 30%, ${cfg.palette[0]}, transparent 60%),` +
                `radial-gradient(circle at 70% 70%, ${cfg.palette[1]}, transparent 60%),` +
                `linear-gradient(135deg, ${cfg.palette[2]}, ${cfg.palette[3]})`,
            }}
        >
            {/* noise */}
            <div
            className="absolute inset-0 mix-blend-soft-light opacity-50 pointer-events-none"
            style={{
                backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%22600%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/></svg>')",
            }}
            />

            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-white text-center drop-shadow">
            <div className="uppercase tracking-wide text-xs opacity-80 mb-2">
                {cfg.label}
            </div>
            <div className="font-serif text-2xl leading-snug">
                {text || cfg.caption}
            </div>
            <div className="mt-4 text-[10px] opacity-80">#MyAugustMood • aacode</div>
            </div>
        </div>
        </main>
    );
}
