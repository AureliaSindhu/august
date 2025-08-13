"use client";

import GlassButton from "./ui/glassBtn";
import { MOODS } from "@/lib/mood";
import { CometCard } from "./ui/comet-card";

export default function GalleryGrid() {
    return (
        <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4 text-center"><span className="italic">myAugustMood</span> Gallery</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6 my-8">
                {Object.entries(MOODS).map(([key, mood]) => (
                    <CometCard key={key} className="h-full">
                        <div
                            className="
                                w-full h-full
                                rounded-xl sm:rounded-xl md:rounded-2xl
                                bg-white/5 backdrop-blur-sm
                                p-3 sm:p-4 md:p-6
                                aspect-[4/3] sm:aspect-[4/4] md:aspect-[4/5] 
                                overflow-hidden
                            "
                            style={{ background: `linear-gradient(135deg, ${mood.palette.join(", ")})` }}
                        >
                            <h3 className="text-sm sm:text-base md:text-xl font-medium mb-2 md:mb-3">
                                {mood.label}
                            </h3>
                            <p className="text-xs sm:text-sm md:text-base text-white/70 leading-snug md:leading-normal">
                                {mood.caption}
                            </p>
                        </div>
                    </CometCard>
                ))}
            </div>
            <GlassButton href="/" className="mt-8">
                Home
            </GlassButton>
        </div>
    );
}
