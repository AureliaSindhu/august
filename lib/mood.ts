export type MoodKey =
    | 'NOSTALGIC_SUMMER'
    | 'BITTERSWEET'
    | 'MELANCHOLY_TWILIGHT'
    | 'SUN_DRENCHED_JOY'
    | 'LATE_NIGHT_LONGING';

export type MoodCfg = {
    label: string;
    palette: string[];
    caption: string;
    keywords: Record<string, number>;
    emojis?: Record<string, number>;
    weight?: number;
};

export const MOODS: Record<MoodKey, MoodCfg> = {
    NOSTALGIC_SUMMER: {
        label: 'Nostalgic Summer',
        palette: ['#F8E3C3','#F7C59F','#EFA8A4','#C9D8C5'],
        caption: 'August felt warm, faded, and almost remembered.',
        keywords: {
        'nostalgic':3,'remember':2,'memory':2,'memories':2,'back then':3,
        'old':1,'summer':1,'warm':1,'sunset':1,'sepia':3,'polaroid':3
        },
        emojis: { '🕰️':3, '🌅':2, '📷':2, '🍑':1 },
        weight: 1.0
    },
    BITTERSWEET: {
        label: 'Bittersweet / Fleeting',
        palette: ['#F6E7F7','#D7BCE8','#9DBAD5','#7A8BA3'],
        caption: 'Sweet, short, and slipping through my fingers.',
        keywords: {
        'bittersweet':3,'fleeting':3,'brief':2,'short-lived':3,
        'almost':2,'slipping':2,'if only':2,'wish':1
        },
        emojis: { '⏳':2,'💫':2,'🌥️':1 },
        weight: 1.1
    },
    MELANCHOLY_TWILIGHT: {
        label: 'Melancholy Twilight',
        palette: ['#0B1D3A','#224C77','#516F9C','#9FB7D3'],
        caption: 'Blue hour, long sighs, quiet streets.',
        keywords: {
        'blue':1,'lonely':3,'melancholy':3,'sad':2,'quiet':2,
        'night':1,'twilight':2,'empty':2,'hollow':3
        },
        emojis: { '🌌':2,'🥀':2,'💤':1 },
        weight: 1.2
    },
    SUN_DRENCHED_JOY: {
        label: 'Sun‑drenched Joy',
        palette: ['#FFF3B0','#FEC89A','#F4978E','#F08080'],
        caption: 'Loud laugh, bright light, golden August.',
        keywords: {
        'happy':2,'joy':3,'laugh':2,'sunny':2,'golden':3,
        'bright':2,'warmth':2,'glow':2,'radiant':3
        },
        emojis: { '☀️':2,'✨':1,'😄':1 },
        weight: 0.9
    },
    LATE_NIGHT_LONGING: {
        label: 'Late‑night Longing',
        palette: ['#1A1423','#372549','#774C60','#B75D69'],
        caption: 'Missed calls. Open windows. Not over it.',
        keywords: {
        'miss':2,'missed':2,'longing':3,'yearn':3,'texted':1,
        'call':1,'midnight':2,'city lights':2,'neon':2
        },
        emojis: { '📱':1,'🌃':2,'💔':2 },
        weight: 1.1
    }
};
