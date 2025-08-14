import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Payload = {
    rating: number;
    likedMost?: string;
    improvements?: string;
    additionalComments?: string;
};

const FORM_ID = "1FAIpQLSdAHAMNiKxmapUV3Tnz6dfqZufDMutp3kScwNzSsXHi-7skfA";
const POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;
const VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;

export async function POST(req: Request) {
    try {
        const { rating, likedMost = "", improvements = "", additionalComments = "" } =
        (await req.json()) as Payload;

        if (!Number.isFinite(rating) || rating < 1 || rating > 5) {
            return NextResponse.json({ ok: false, error: "Invalid rating (1–5)" }, { status: 400 });
        }

        const p = new URLSearchParams();
        p.set("entry.896574834", String(Math.round(rating)));
        p.set("entry.453301013", likedMost);
        p.set("entry.411898009", improvements);
        p.set("entry.1541039041", additionalComments);

        const resp = await fetch(POST_URL, {
            method: "POST",
            body: p,
            redirect: "manual",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                Referer: VIEW_URL,
                Origin: "https://docs.google.com",
            },
        });

        const ok = resp.status === 200 || resp.status === 302;
        return NextResponse.json({ ok, status: resp.status, redirected: resp.redirected });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err?.message ?? "Unknown error" }, { status: 500 });
    }
}
