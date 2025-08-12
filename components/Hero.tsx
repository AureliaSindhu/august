import GlassButton from "./ui/glassBtn";
import { CometCard } from "./ui/comet-card";

export default function Hero() {
    return (
        <main className="relative isolate min-h-[80vh] w-full overflow-hidden text-white">
            <section className="mx-auto max-w-4xl px-6 pt-20 pb-12 text-center sm:px-8">
                <h1 className="mx-auto max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
                    #myAugustMood
                </h1>

                <p className="mx-auto m-4 max-w-xl text-pretty text-sm text-white/70 sm:text-base">
                    Transform your August feelings into dreamy visuals, like folklore&apos;s golden hour, distilled.
                </p>

                <CometCard className="flex items-center justify-center m-10">
                    <button
                        type="button"
                        className="flex w-70 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:p-4"
                        aria-label="View invite F7RA"
                        style={{
                            transformStyle: "preserve-3d",
                            transform: "none",
                            opacity: 1,
                        }}
                    >
                        <div className="mx-2 flex-1">
                            <div className="relative aspect-[3/4] w-full">
                                <img
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
                                    alt="Folklore"
                                    src="/folklore.png"
                                />
                            </div>
                        </div>
                        <div className="flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
                        <div className="text-xs">Folklore</div>
                        <div className="text-xs text-gray-300 opacity-50">#myAugustMood</div>
                        </div>
                    </button>
                </CometCard>

                <GlassButton href="/mood">
                    <span>Start my august story</span>
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
            </section>
        </main>
    );
}
