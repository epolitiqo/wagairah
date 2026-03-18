"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { insertFragment, type Fragment } from "@/lib/supabase/fragments";

type FragmentComposerProps = {
  logo: string;
  onSaved?: (fragment: Fragment) => void;
};

export function FragmentComposer({ logo, onSaved }: FragmentComposerProps) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = content.trim();
    if (!value) {
      setStatus("Write a fragment first.");
      return;
    }

    try {
      setIsSaving(true);
      setStatus(null);
      const fragment = await insertFragment(value);
      setContent("");
      setStatus("Saved.");
      onSaved?.(fragment);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not save this fragment.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 flex w-full max-w-xl flex-col items-center sm:mt-16">
      <label htmlFor="thought" className="sr-only">
        Start a thought
      </label>
      <input
        id="thought"
        name="thought"
        type="text"
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder="Start a thought…"
        className="w-full border-0 border-b border-[rgba(17,17,17,0.2)] bg-transparent px-0 pb-4 text-center text-lg text-[var(--foreground)] outline-none placeholder:text-[rgba(17,17,17,0.38)] focus:border-[var(--foreground)]"
      />

      <p className="mt-6 text-sm tracking-[-0.04em] text-[var(--foreground)]">{logo}</p>
      <button
        type="submit"
        className="mt-3 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] disabled:cursor-default"
        disabled={isSaving}
      >
        {isSaving ? "saving…" : "continue →"}
      </button>

      {status ? (
        <p className="mt-4 text-xs text-[rgba(17,17,17,0.52)]" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
    </form>
  );
}
