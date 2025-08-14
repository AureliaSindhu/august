"use client";

import { useState } from "react";
import { X, Star } from "lucide-react";
import GlassButton from "./ui/glassBtn";

async function submitRating(payload: {
  rating: number;
  likedMost: string;
  improvements?: string;
  additionalComments?: string;
}) {
  const res = await fetch("/api/rating", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || "Submit failed");
  }
}

interface RatingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RatingPopup({ isOpen, onClose }: RatingPopupProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [likedMost, setLikedMost] = useState("");
  const [improvements, setImprovements] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitRating({
        rating,
        likedMost,
        improvements,
        additionalComments,
      });

      // Reset + close
      setRating(0);
      setLikedMost("");
      setImprovements("");
      setAdditionalComments("");
      onClose();

      alert("Thank you for your feedback! Your rating has been submitted.");
    } catch (error) {
      console.error("Error submitting rating:", error);
      alert("There was an error submitting your rating. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-4 p-6 rounded-2xl bg-black/90 border border-white/20 backdrop-blur-sm">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-white mb-2">
            Rate Your Mood Card
          </h3>
          <p className="text-sm text-white/70">
            How did this mood capture your August feeling?
          </p>
        </div>

        {/* Rating stars */}
        <div className="flex justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoveredRating(star)}
              onMouseLeave={() => setHoveredRating(0)}
              className="p-2 transition-transform hover:scale-110"
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hoveredRating || rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-white/30"
                }`}
              />
            </button>
          ))}
        </div>

        {/* Liked Most */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/80 mb-2">
            What did you like most about myAugustMood?
          </label>
          <textarea
            value={likedMost}
            onChange={(e) => setLikedMost(e.target.value)}
            placeholder="Share what you enjoyed..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/40 outline-none focus:ring-white/20 resize-none"
            rows={2}
            maxLength={200}
          />
        </div>

        {/* Improvements */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/80 mb-2">
            What could be improved?
          </label>
          <textarea
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="Share your suggestions..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/40 outline-none focus:ring-white/20 resize-none"
            rows={2}
            maxLength={200}
          />
        </div>

        {/* Additional Comments */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-white/80 mb-2">
            Additional Comments
          </label>
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Any other thoughts..."
            className="w-full px-4 py-3 rounded-xl bg-white/5 ring-1 ring-white/10 text-white placeholder-white/40 outline-none focus:ring-white/20 resize-none"
            rows={2}
            maxLength={200}
          />
        </div>

        {/* Submit button */}
        <div className="flex gap-3 text-center items-center justify-center">
          <GlassButton
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/20 text-white hover:bg-white/10 text-center flex items-center justify-center"
          >
            Cancel
          </GlassButton>
          <GlassButton
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-center flex items-center justify-center"
          >
            {isSubmitting ? "Submitting..." : "Submit Rating"}
          </GlassButton>
        </div>
      </div>
    </div>
  );
}
