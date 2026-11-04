"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { pillars } from "@/data/pillars";
import { cn } from "@/lib/utils";
import type { PillarSlug, Post } from "@/types";
import { PostCard } from "./PostCard";

type Filter = "all" | PillarSlug;
const isPillar = (v: string | null): v is PillarSlug => v === "ai" || v === "business" || v === "life";

/** Category filter synced to the URL (?category=ai) so filters are shareable. */
export function JournalList({ posts }: { posts: Post[] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("category");
  const active: Filter = isPillar(raw) ? raw : "all";

  const visible = useMemo(() => (active === "all" ? posts : posts.filter((p) => p.category === active)), [posts, active]);

  const setFilter = (f: Filter) => {
    const next = new URLSearchParams(params);
    if (f === "all") next.delete("category");
    else next.set("category", f);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const filters: { value: Filter; label: string }[] = [
    { value: "all", label: "All posts" },
    ...pillars.map((p) => ({ value: p.slug as Filter, label: p.title })),
  ];

  return (
    <>
      <div role="tablist" aria-label="Filter posts by topic" className="glass mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full p-1.5">
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={active === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors",
              active === f.value ? "text-white" : "text-ink hover:text-violet",
            )}
          >
            {active === f.value && (
              <motion.span layoutId="journal-filter" className="bg-brand absolute inset-0 -z-10 rounded-full" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
            )}
            <span className="relative">{f.label}</span>
          </button>
        ))}
      </div>

      <motion.ul layout className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((post) => (
            <motion.li
              key={post.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
            >
              <PostCard post={post} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {visible.length === 0 && (
        <p className="mt-16 text-center text-ink-soft">No posts in this topic yet. Check back soon!</p>
      )}
    </>
  );
}
