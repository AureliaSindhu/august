"use client";

import { useEffect, useRef, useState } from "react";
import { ensureAutoplay, getPlayer, TRACK } from "@/lib/player";

export default function Nav() {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [expanded, setExpanded] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // bind to the global audio once per mount
    useEffect(() => {
        const a = getPlayer();
        if (!a) return;
        audioRef.current = a;

        const syncPlayState = () => setIsPlaying(!a.paused);
        const onTime = () => setTime(a.currentTime);
        const onMeta = () => setDuration(isFinite(a.duration) ? a.duration : 0);
        const onEnd = () => setIsPlaying(false);

        // initial sync
        syncPlayState();
        onTime();
        if (a.readyState >= 1) onMeta();

        // listeners keep UI in sync with the shared player
        a.addEventListener("play", syncPlayState);
        a.addEventListener("pause", syncPlayState);
        a.addEventListener("timeupdate", onTime);
        a.addEventListener("loadedmetadata", onMeta);
        a.addEventListener("ended", onEnd);

        ensureAutoplay();

        return () => {
        // not pausing on unmount — let music continue playing
        a.removeEventListener("play", syncPlayState);
        a.removeEventListener("pause", syncPlayState);
        a.removeEventListener("timeupdate", onTime);
        a.removeEventListener("loadedmetadata", onMeta);
        a.removeEventListener("ended", onEnd);
        };
    }, []);

    const toggle = () => {
        const a = audioRef.current;
        if (!a) return;
        if (a.paused) a.play().catch(() => {});
        else a.pause();
    };

    const seekPct = duration ? (time / duration) * 100 : 0;
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
                "flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-6 py-2 text-white shadow-xl backdrop-blur-xl transition-all duration-300",
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

                {!expanded ? (
                <div className="flex min-w-0 flex-1 items-center justify-between">
                    <p className="truncate pr-2 text-sm leading-5">{TRACK.title}</p>
                    <div className="flex h-3 w-5 items-end justify-between">
                        <span className={`h-full w-[3px] rounded-full bg-current origin-bottom ${isPlaying ? "bg-green-500" : "opacity-50"}`} />
                        <span className={`h-full w-[3px] rounded-full bg-current origin-bottom ${isPlaying ? "bg-green-500" : "opacity-50"}`} />
                        <span className={`h-full w-[3px] rounded-full bg-current origin-bottom ${isPlaying ? "bg-green-500" : "opacity-50"}`} />
                    </div>
                </div>
                ) : (
                <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{TRACK.title}</p>
                        <p className="truncate text-[11px] text-white/70">{TRACK.artist}</p>
                    </div>
                    <button
                        onClick={toggle}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="2.5" width="4" height="13" rx="1" />
                            <rect x="11" y="2.5" width="4" height="13" rx="1" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7-11-7z" />
                        </svg>
                        )}
                    </button>
                    </div>

                    <div className="mt-2">
                    <input
                        type="range"
                        min={0}
                        max={100}
                        value={seekPct}
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
