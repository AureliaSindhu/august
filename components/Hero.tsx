import Link from "next/link";

export default function Hero() {
    return (
        <div className="bg-backrgound text-foreground max-w-4xl mx-auto p-16 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">#myAugustMood</h1>
            <p className="text-sm text-center">
                Transform your August feelings into dreamy visuals inspired by folklore's golden hour
            </p>

            <button className="bg-primary text-foreground px-4 py-2 rounded-md">
                <Link href="/mood">
                    start my august story
                </Link>
            </button>
        </div>
    );
}