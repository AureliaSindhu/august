"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, RotateCcw, FolderOpen, Download } from "lucide-react";
import GlassButton from "./ui/glassBtn";
import RatingPopup from "./RatingPopup";

async function downloadResCard() {
  const node = document.getElementById("rescard");
  if (!node) {
    alert("Couldn't find the card to download.");
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
  const [showRating, setShowRating] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="gap-3 flex flex-row -max-w-md w-full">
        <GlassButton
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Again
        </GlassButton>

        <GlassButton
          onClick={() => setShowRating(true)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <Star className="w-4 h-4 mr-2" />
          Share
        </GlassButton>

        <GlassButton
          onClick={downloadResCard}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </GlassButton>

        

      {showRating && (
        <RatingPopup isOpen={showRating} onClose={() => setShowRating(false)} />
      )}
    </div>
    <div className="flex flex-row gap-3 mt-4">
        <GlassButton
          onClick={() => router.push("/gallery")}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm col-start-2 flex items-center justify-center"
        >
          <FolderOpen className="w-4 h-4 mr-2" />
          Gallery
        </GlassButton>

        <GlassButton
          onClick={() => setShowRating(true)}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <Star className="w-4 h-4 mr-2" />
          Rate
        </GlassButton>
      </div>
      </div>
  );
}
