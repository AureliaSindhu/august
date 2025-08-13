"use client";

import * as React from "react";
import { MOODS, type MoodKey } from "@/lib/mood";

type ResultCardProps = {
    text?: string;
    mood?: MoodKey | string;
    className?: string;
    heightClassName?: string;
    widthClassName?: string;
    id?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const DEFAULT_MOOD: MoodKey = "bittersweet";

function normalizeKey(k?: string): MoodKey {
    const key = (k ?? DEFAULT_MOOD).toString().toLowerCase() as MoodKey;
    return MOODS[key] ? key : DEFAULT_MOOD;
}

function normalizePalette(p?: string[]) {
    const fb = ["#1f2937", "#374151", "#0b1220", "#0a0f1f"];
    const out = Array.isArray(p) ? [...p] : [];
    while (out.length < 4) out.push(fb[out.length] ?? fb[0] as string);
    return out.slice(0, 4) as [string, string, string, string];
}

export default function ResultCard({
    text = "",
    mood,
    className = "",
    heightClassName = "h-[520px]",
    widthClassName = "w-full max-w-md",
    id = "rescard",
    ...rest
}: ResultCardProps) {
    const moodKey = normalizeKey(mood);
    const cfg = MOODS[moodKey];
    const [p0, p1, p2, p3] = normalizePalette(cfg.palette);

    const backgroundImage =
        `radial-gradient(circle at 30% 30%, ${p0}, transparent 60%),` +
        `radial-gradient(circle at 70% 70%, ${p1}, transparent 60%),` +
        `linear-gradient(135deg, ${p2}, ${p3})`;

    return (
        <div
        id={id}
        data-mood={moodKey}
        className={[
            widthClassName,
            heightClassName,
            "rounded-3xl relative overflow-hidden",
            "shadow-[0_20px_60px_rgba(0,0,0,.25)]",
            className,
        ].filter(Boolean).join(" ")}
        style={{ backgroundImage }}
        {...rest}
        >
        {/* noise */}
        <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light opacity-50 pointer-events-none"
            style={{
            backgroundImage:
                "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%221200%22 height=%22600%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.06%22/></svg>')",
            }}
        />

        {/* content */}
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
    );
}
