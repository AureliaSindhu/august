import type { MoodKey } from './mood'
import { MOODS } from './mood'

const EMOJI_RANGE = /[\u{1F300}-\u{1FAFF}]/gu

export function preprocess(text: string) {
    return text
        .toLowerCase()
        .replace(EMOJI_RANGE, (m) => ` ${m} `)             // isolate emojis
        .replace(/[^\p{L}\p{N}\s'’-]/gu, ' ')              // keep letters/numbers/apostrophes/dashes
        .replace(/\s+/g, ' ')
        .trim()
}

export function scoreMood(raw: string): {
    mood: MoodKey
    scores: Record<MoodKey, number>
    } {
    const input = preprocess(raw)
    const padded = ` ${input} `
    const tokens = input ? input.split(' ') : []

    const scores = {} as Record<MoodKey, number>

    ;(Object.keys(MOODS) as MoodKey[]).forEach((key) => {
        const cfg = MOODS[key]
        let s = 0

        // phrase-first (2+ words)
        for (const [kw, w] of Object.entries(cfg.keywords)) {
        if (kw.includes(' ') && padded.includes(` ${kw} `)) s += w * 1.4
        }

        // single words + gentle stemming
        for (const [kw, w] of Object.entries(cfg.keywords)) {
        if (!kw.includes(' ')) {
            for (const t of tokens) {
            if (t === kw) s += w
            else if (!kw.endsWith('s') && t.startsWith(kw) && t.length > kw.length) s += w * 0.5
            }
        }
        }

        // emojis
        for (const [emo, w] of Object.entries(cfg.emojis ?? {})) {
        if (padded.includes(emo)) s += w
        }

        scores[key] = s * (cfg.weight ?? 1)
    })

    let best = (Object.keys(scores) as MoodKey[]).sort((a, b) => scores[b] - scores[a])[0]
    if (!raw.trim()) best = 'BITTERSWEET'
    return { mood: best ?? 'BITTERSWEET', scores }
}
