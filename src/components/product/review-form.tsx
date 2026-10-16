"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloseIcon, StarShape } from "@/components/ui/icons";
import type { Review } from "@/types";

export function ReviewForm({ onSubmit, onClose }: { onSubmit: (r: Review) => void; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!rating) next.rating = "Choose a rating";
    if (!name.trim()) next.name = "Enter your name";
    if (comment.trim().length < 10) next.comment = "Write at least 10 characters";
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit({ rating, reviewerName: name.trim(), comment: comment.trim(), date: new Date().toISOString() });
  };

  const field = "w-full rounded-[20px] bg-surface px-5 py-3 outline-none focus-visible:ring-2 focus-visible:ring-ink";
  return (
    <dialog ref={dialog} onClose={onClose} aria-labelledby="review-title"
      className="m-auto w-[min(520px,calc(100vw-2rem))] rounded-[20px] p-0 backdrop:bg-ink/40">
      <form onSubmit={submit} noValidate className="p-6 lg:p-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="review-title" className="text-xl font-bold lg:text-2xl">Write a Review</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close"><CloseIcon /></button>
        </div>
        <fieldset className="mb-4">
          <legend className="mb-2 text-sm font-medium">Your rating</legend>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} star${n > 1 ? "s" : ""}`} aria-pressed={rating === n}
                className="rounded-full p-0.5">
                <span className={rating >= n ? "" : "opacity-30 grayscale"}><StarShape fill="full" size={28} /></span>
              </button>
            ))}
          </div>
          {errors.rating && <p className="mt-1 text-sm text-sale">{errors.rating}</p>}
        </fieldset>
        <label className="mb-4 block">
          <span className="mb-2 block text-sm font-medium">Name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} maxLength={40} className={`${field} rounded-full`} aria-invalid={!!errors.name} />
          {errors.name && <span className="mt-1 block text-sm text-sale">{errors.name}</span>}
        </label>
        <label className="mb-2 block">
          <span className="mb-2 block text-sm font-medium">Review</span>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={4} maxLength={600} className={field} aria-invalid={!!errors.comment} />
          {errors.comment && <span className="mt-1 block text-sm text-sale">{errors.comment}</span>}
        </label>
        <p className="mb-5 text-xs text-muted">This demo has no review backend, so your review is saved only in this browser.</p>
        <Button type="submit" className="w-full">Post Review</Button>
      </form>
    </dialog>
  );
}
