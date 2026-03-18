"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { FragmentComposer } from "@/components/home/fragment-composer";
import { cta, footerLinks, siteConfig } from "@/lib/site";
import { fetchLatestFragments, type Fragment } from "@/lib/supabase/fragments";

export function HomePage() {
  const [latestFragments, setLatestFragments] = useState<Fragment[]>([]);
  const [isLoadingFragments, setIsLoadingFragments] = useState(true);
  const [fragmentError, setFragmentError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadFragments() {
      try {
        const data = await fetchLatestFragments(10);
        if (!isActive) {
          return;
        }

        setLatestFragments(data);
        setFragmentError(null);
      } catch (error) {
        if (!isActive) {
          return;
        }

        setFragmentError(error instanceof Error ? error.message : "Could not load fragments.");
      } finally {
        if (isActive) {
          setIsLoadingFragments(false);
        }
      }
    }

    void loadFragments();

    return () => {
      isActive = false;
    };
  }, []);

  function handleFragmentSaved(fragment: Fragment) {
    setLatestFragments((current) => [fragment, ...current.filter((item) => item.id !== fragment.id)].slice(0, 10));
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <Container className="flex min-h-screen items-center justify-center py-16">
        <section className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
          <p className="logo-mark text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.05em] text-[var(--foreground)]">
            {siteConfig.logo}
          </p>

          <div className="mt-10 max-w-3xl sm:mt-12">
            <h1 className="text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.98] tracking-[-0.06em] text-[var(--foreground)]">
              {siteConfig.title}
            </h1>
          </div>

          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--muted)] sm:mt-8 sm:text-xl sm:leading-8">
            {siteConfig.description}
          </p>

          <FragmentComposer logo={siteConfig.logo} onSaved={handleFragmentSaved} />
        </section>
      </Container>

      <Container className="pb-24 sm:pb-32">
        <section className="mx-auto w-full max-w-3xl">
          {latestFragments.length > 0 ? (
            <ul className="space-y-10">
              {latestFragments.map((fragment) => (
                <li key={fragment.id} className="text-left">
                  <p className="text-[clamp(1.4rem,2.8vw,2rem)] leading-[1.55] tracking-[-0.035em] text-[var(--foreground)]">
                    {fragment.content} <span className="text-[var(--muted)]">{siteConfig.logo}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : isLoadingFragments ? (
            <p className="text-center text-sm text-[var(--muted)]">Loading fragments…</p>
          ) : fragmentError ? (
            <p className="text-center text-sm text-[var(--muted)]">{fragmentError}</p>
          ) : (
            <p className="text-center text-sm text-[var(--muted)]">No fragments yet.</p>
          )}
        </section>
      </Container>

      <Container className="pb-20 sm:pb-24">
        <section className="mx-auto flex w-full max-w-3xl items-center justify-center gap-3 text-center">
          <span className="h-2 w-2 rounded-full bg-[#D32F2F]" aria-hidden="true" />
          <p className="text-base tracking-[-0.03em] text-[var(--foreground)] sm:text-lg">
            Some things don’t need to be finished.
          </p>
        </section>
      </Container>

      <Container className="pb-24 sm:pb-28">
        <section className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center">
          <p className="text-[clamp(1.6rem,3vw,2.25rem)] tracking-[-0.04em] text-[var(--foreground)]">{cta.title}</p>
          <a href="/" className="mt-5 text-base text-[var(--muted)] transition hover:text-[var(--foreground)]">
            {cta.action}
          </a>
        </section>
      </Container>

      <Container className="pb-12 sm:pb-16">
        <footer className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center text-[rgba(17,17,17,0.44)]">
          <p className="text-sm tracking-[-0.04em]">{siteConfig.logo}</p>
          <nav className="mt-3 flex flex-col items-center gap-1 text-xs">
            {footerLinks.map((link) => (
              <a key={link} href="/" className="transition hover:text-[var(--foreground)]">
                {link}
              </a>
            ))}
          </nav>
        </footer>
      </Container>
    </main>
  );
}
