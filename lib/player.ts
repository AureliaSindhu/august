export type Track = { 
    title: string; 
    artist: string; 
    artwork: string; 
    src: string };

export const TRACK: Track = {
    title: "august",
    artist: "Taylor Swift",
    artwork: "https://i.scdn.co/image/ab67616d0000b273c288028c2592f400dd0b9233",
    src: "/audio/august.mp3",
};

// one whole audio for the whole app
let audio: HTMLAudioElement | null = null;
let triedAutoplay = false;

export function getPlayer(): HTMLAudioElement | null {
    if (typeof window === "undefined") return null;
    if (!audio) {
        audio = new Audio(TRACK.src);
        audio.preload = "metadata";
    }
    return audio;
}

export function ensureAutoplay() {
    const a = getPlayer();
    if (!a || triedAutoplay) return;
    triedAutoplay = true;

    a.autoplay = true;

    const attempt = () =>
    a.play().catch((err) => {
        const isBlocked = (err as any)?.name === "NotAllowedError";
        if (!isBlocked) return;

        const unlock = () => {
        a.play().finally(() => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
            window.removeEventListener("touchstart", unlock);
        });
        };
        window.addEventListener("pointerdown", unlock, { once: true });
        window.addEventListener("keydown", unlock, { once: true });
        window.addEventListener("touchstart", unlock, { once: true });
    });

    if (a.readyState >= 2) attempt();
    else a.addEventListener("canplay", attempt, { once: true });
}