"use client";

import { useRouter } from "next/navigation";
import GlassButton from "./ui/glassBtn";

async function downloadResCard() {
  const node = document.getElementById("rescard");
  if (!node) {
    alert("Couldn’t find the card to download.");
    return;
  }
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "transparent",
  });

  const link = document.createElement("a");
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  link.download = `mood-card-${stamp}.png`;
  link.href = dataUrl;
  link.click();
}

export default function ResultActions() {
  const router = useRouter();

  return (
    <div className="flex gap-3 justify-center">
      <GlassButton
        onClick={() => alert("Rating feature coming soon!")}
        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
      >
        ⭐ Rate
      </GlassButton>

      <GlassButton
        onClick={() => router.push("/mood")}
        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
      >
        🔄 Again
      </GlassButton>

      <GlassButton
        onClick={() => router.push("/gallery")}
        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
      >
        📂 Gallery
      </GlassButton>

      <GlassButton
        onClick={downloadResCard}
        className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm"
      >
        ⬇️ Download
      </GlassButton>
    </div>
  );
}
