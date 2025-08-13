"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star, RotateCcw, FolderOpen, Download, Share2 } from "lucide-react";
import GlassButton from "./ui/glassBtn";
import RatingPopup from "./RatingPopup";

async function captureResCardBlob(): Promise<Blob | null> {
  const node = document.getElementById("rescard");
  if (!node) {
    alert("Couldn't find the card to share.");
    return null;
  }
  const { toBlob } = await import("html-to-image");
  const blob = await toBlob(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "transparent",
  });
  if (!blob) {
    alert("Failed to render the image.");
    return null;
  }
  return blob;
}

async function shareResCard() {
  try {
    const blob = await captureResCardBlob();
    if (!blob) return;

    const file = new File([blob], `mood-card-${Date.now()}.png`, {
      type: "image/png",
    });

    // 1) Best: Web Share Level 2 with files
    if (
      typeof navigator !== "undefined" &&
      "canShare" in navigator &&
      navigator.canShare?.({ files: [file] })
    ) {
      await navigator.share({
        title: "My August Mood",
        text: "Check out my August mood card!",
        files: [file],
      });
      return;
    }

    // 2) Fallback: copy image blob to clipboard (secure contexts only)
    if (
      typeof navigator !== "undefined" &&
      "clipboard" in navigator &&
      typeof ClipboardItem !== "undefined"
    ) {
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      alert("Image copied to clipboard! Paste it into your app.");
      return;
    }

    // 3) Last resort: download the image
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const moodName = document.querySelector('[data-mood]')?.getAttribute('data-mood') || 'unknown';
    a.download = `myAugustMood.${moodName}.png`;
    a.click();
    URL.revokeObjectURL(url);
    alert("We downloaded the image since your browser can't share it directly.");
  } catch (err) {
    console.error("Error sharing:", err);
    alert("Failed to share. Try downloading instead.");
  }
}

async function downloadResCard() {
  const blob = await captureResCardBlob();
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const moodName = document.querySelector('[data-mood]')?.getAttribute('data-mood') || 'unknown';
  a.download = `myAugustMood.${moodName}.png`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ResultActions() {
  const router = useRouter();
  const [showRating, setShowRating] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center w-full px-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-md">
        <GlassButton
          onClick={() => router.push("/")}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Again
        </GlassButton>

        <GlassButton
          onClick={shareResCard}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </GlassButton>

        <GlassButton
          onClick={downloadResCard}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center col-span-2 sm:col-span-1"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </GlassButton>
      </div>

      {showRating && (
        <RatingPopup isOpen={showRating} onClose={() => setShowRating(false)} />
      )}

      <div className="grid grid-cols-2 gap-3 mt-4 w-full max-w-md">
        <GlassButton
          onClick={() => router.push("/gallery")}
          className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm flex items-center justify-center"
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
