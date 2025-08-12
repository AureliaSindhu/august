"use client";

import { useState } from "react";

export default function Nav() {
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlayback = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-accent/80 backdrop-blur-lg rounded-full px-6 py-3 flex items-center gap-4">
            <button
                onClick={togglePlayback}
                className="text-foreground hover:text-tertiary transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
            >
                {isPlaying ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 4l12 8-12 8V4z" />
                    </svg>
                )}
            </button>
            <div className="text-sm text-foreground">
                <p className="font-medium">august</p>
                <p className="text-tertiary text-xs">Taylor Swift</p>
            </div>
        </div>
    );
}
