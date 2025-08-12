import Link from "next/link";

export default function GlassButton({
    href,
    children,
    }: {
        href: string;
        children: React.ReactNode;
    }) {
    return (
        <Link
        href={href}
        className={[
            // layout
            "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium",
            // glass base
            "backdrop-blur-xl bg-white/10 border border-white/20 ring-1 ring-inset ring-white/10",
            // lighting: outer drop + subtle inner top highlight
            "shadow-[0_10px_30px_rgba(0,0,0,.35)]",
            "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
            "before:bg-gradient-to-b before:from-white/35 before:to-white/5 before:opacity-70",
            "before:[mask-image:linear-gradient(to_bottom,white,transparent_65%)]",
            // sheen sweep
            "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit]",
            "after:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.75),transparent)]",
            "after:opacity-0 after:translate-x-[-200%] group-hover:after:opacity-70 group-hover:after:translate-x-[200%]",
            "after:transition-all after:duration-700 after:ease-out",
            // interactions
            "transition-colors duration-300 hover:bg-white/14 active:scale-[.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
        ].join(" ")}
        >
        {children}
        </Link>
    );
}