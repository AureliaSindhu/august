import GlassButton from "./ui/glassBtn";

export default function Hero() {
    return (
        <main className="relative isolate min-h-[80vh] w-full overflow-hidden text-white">
        <section className="mx-auto max-w-3xl px-6 py-28 text-center sm:px-8">
            <h1 className="mx-auto max-w-2xl text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
            #myAugustMood
            </h1>

            <p className="mx-auto mt-4 mb-4 max-w-xl text-pretty text-sm text-white/70 sm:text-base">
            Transform your August feelings into dreamy visuals—like folklore&apos;s golden hour, distilled.
            </p>

            
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
                className="transition-transform duration-300 group-hover:translate-x-0.5 "
                >
                <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
            </GlassButton>

        </section>
        </main>
    );
}
