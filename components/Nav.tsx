"use client";

import { useEffect, useRef, useState } from "react";

type Track = { title: string; artist: string; artwork: string; src: string };

const TRACK: Track = {
    title: "august",
    artist: "Taylor Swift",
    artwork: "https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233",
    src: "/audio/august.mp3",
};

export default function Nav() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const rafRef = useRef<number | null>(null);

    const [expanded, setExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // init audio
    useEffect(() => {
        const a = new Audio(TRACK.src);
        a.preload = "metadata";
        a.addEventListener("loadedmetadata", () => setDuration(a.duration || 0));
        a.addEventListener("ended", () => {
        setIsPlaying(false);
        setTime(0);
        });
        audioRef.current = a;
        return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        a.pause();
        audioRef.current = null;
        };
    }, []);

    // progress loop
    useEffect(() => {
        const a = audioRef.current;
        if (!a) return;

        if (isPlaying) {
        a.play().catch(() => setIsPlaying(false));
        const tick = () => {
            setTime(a.currentTime);
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        } else {
        a.pause();
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        }
    }, [isPlaying]);

    const pct = duration ? (time / duration) * 100 : 0;
    const format = (s: number) => {
        if (!isFinite(s)) return "0:00";
        const m = Math.floor(s / 60);
        const ss = Math.floor(s % 60).toString().padStart(2, "0");
        return `${m}:${ss}`;
    };

    return (
        <div className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div
            onClick={() => setExpanded((v) => !v)}
            role="region"
            aria-label="Now Playing"
            className={[
            "flex items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-4 py-2 text-white shadow-xl backdrop-blur-xl transition-all duration-300",
            expanded ? "w-[360px]" : "w-[180px]",
            ].join(" ")}
        >
            <img
            src={TRACK.artwork}
            alt=""
            draggable={false}
            className={[
                "rounded-full object-cover transition-all duration-300",
                expanded ? "h-9 w-9" : "h-6 w-6",
            ].join(" ")}
            />

            {/* Collapsed pill */}
            {!expanded && (
            <div className="flex min-w-0 flex-1 items-center justify-between">
                <p className="truncate pr-2 text-sm leading-5">{TRACK.title}</p>
                {/* equalizer (Tailwind animations) */}
                <div className="flex h-3 w-5 items-end justify-between">
                <span
                    className={[
                    "h-full w-[3px] rounded-full bg-current origin-bottom",
                    isPlaying ? "animate-eq1" : "opacity-50",
                    ].join(" ")}
                />
                <span
                    className={[
                    "h-full w-[3px] rounded-full bg-current origin-bottom",
                    isPlaying ? "animate-eq2" : "opacity-50",
                    ].join(" ")}
                />
                <span
                    className={[
                    "h-full w-[3px] rounded-full bg-current origin-bottom",
                    isPlaying ? "animate-eq3" : "opacity-50",
                    ].join(" ")}
                />
                </div>
            </div>
            )}

            {/* Expanded island */}
            {expanded && (
            <div className="min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{TRACK.title}</p>
                    <p className="truncate text-[11px] text-white/70">
                    {TRACK.artist}
                    </p>
                </div>

                <button
                    onClick={() => setIsPlaying((p) => !p)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                    aria-label={isPlaying ? "Pause" : "Play"}
                >
                    {isPlaying ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <rect x="3" y="2.5" width="4" height="13" rx="1" />
                        <rect x="11" y="2.5" width="4" height="13" rx="1" />
                    </svg>
                    ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path d="M8 5v14l11-7-11-7z" />
                    </svg>
                    )}
                </button>
                </div>

                {/* progress */}
                <div className="mt-2">
                <input
                    type="range"
                    min={0}
                    max={100}
                    value={pct}
                    onChange={(e) => {
                    const a = audioRef.current;
                    if (!a || !duration) return;
                    const v = Number(e.target.value);
                    const t = (v / 100) * duration;
                    a.currentTime = t;
                    setTime(t);
                    }}
                    className="w-full accent-white/90"
                    aria-label="Seek"
                />
                <div className="mt-1 flex items-center justify-between text-[10px] text-white/60">
                    <span>{format(time)}</span>
                    <span>{format(duration)}</span>
                </div>
                </div>
            </div>
            )}
        </div>
        </div>
    );
}
