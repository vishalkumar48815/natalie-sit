"use client";

import { ErrorState } from "@/components/ui/ErrorState";

export default function JournalError({ error, retry }: { error: unknown; retry: () => void }) {
  return <ErrorState error={error} retry={retry} title="This article couldn't load." />;
}
