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
const VIEW_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform`;
const POST_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`;

async function fetchFbzx(): Promise<string | null> {
    const res = await fetch(VIEW_URL, {
        method: "GET",
        headers: {
        "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        },
    });

    const html = await res.text();
    const m = html.match(/name="fbzx"\s+value="([^"]+)"/);
    return m?.[1] ?? null;
}

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as Payload;

        // More detailed console logging
        console.log("=== Rating Submission ===");
        console.log("Rating:", body.rating);
        console.log("Liked Most:", body.likedMost || "(empty)");
        console.log("Improvements:", body.improvements || "(empty)");
        console.log("Additional Comments:", body.additionalComments || "(empty)");

        const { rating, likedMost = "", improvements = "", additionalComments = "" } = body;
        if (typeof rating !== "number" || rating < 1 || rating > 5) {
        return NextResponse.json({ ok: false, error: "Invalid rating (1–5)" }, { status: 400 });
        }

        // 1) Grab fbzx token (session key) from the live form
        const fbzx = await fetchFbzx();
        if (!fbzx) {
        return NextResponse.json(
            { ok: false, error: "Could not fetch form token (fbzx)" },
            { status: 502 }
        );
        }

        // 2) Build payload with your entry IDs + hidden fields
        const p = new URLSearchParams();
        p.set("entry.1761587451", String(rating));
        p.set("entry.1024140550", likedMost);
        p.set("entry.1565545793", improvements);
        p.set("entry.1137175505", additionalComments);

        // ----- Hidden/session fields that stabilize submission -----
        p.set("fvv", "1");
        p.set("pageHistory", "0");
        p.set("draftResponse", "[]");
        p.set("fbzx", fbzx);
        p.set("submit", "Submit");

        // 3) Submit
        const resp = await fetch(POST_URL, {
        method: "POST",
        body: p,
        redirect: "manual",
        headers: {
            Referer: VIEW_URL,
            Origin: "https://docs.google.com",
        },
        });

        const ok = resp.status === 200 || resp.status === 302;
        console.log("Form submission result:", {
            ok,
            status: resp.status,
            redirected: resp.redirected
        });

        return NextResponse.json({
        ok,
        status: resp.status,
        redirected: resp.redirected,
        });
    } catch (err: any) {
        console.error("Rating submission error:", err);
        return NextResponse.json(
        { ok: false, error: err?.message ?? "Unknown error" },
        { status: 500 }
        );
    }
}
