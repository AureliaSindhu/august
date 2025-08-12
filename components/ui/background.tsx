export default function Background({
    className = "",
    children,
}: {
    className?: string;
    children?: React.ReactNode;
}) {
    return (
    <div
        className={[
        "relative isolate bg-[var(--secondary)] text-[var(--foreground)]",
        className,
        ].join(" ")}
    >
        {/* Light base with gentle gradient */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--highlight)_0%,var(--primary)_55%,var(--secondary)_100%)]" />

        {/* Soft top highlight & bottom shadow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_-10%,rgba(0,0,0,0.03),transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_110%,rgba(0,0,0,0.08),transparent_60%)]" />

        {/* Subtle border highlights */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--tertiary)]/40 to-transparent" />
        <div className="pointer-events-none absolute left-0 right-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-[var(--secondary)]/20 to-transparent opacity-80" />

        {/* Fine noise texture */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.02] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22160%22 height=%22160%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%22.35%22/></svg>')]" />

        {children}
    </div>
    );
}
    