import { NextResponse } from "next/server";
import { toGoogleParams } from "@/lib/form";

export async function POST(req: Request) {
    const body = await req.json();
    const res = await fetch("https://docs.google.com/forms/u/0/d/1ngZze5FdJeufpyqVx04u-AUP5b_cGZZ3U5g5hw1ex_o/formResponse", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: toGoogleParams(body),
    });
    return NextResponse.json({ ok: res.ok });
}
