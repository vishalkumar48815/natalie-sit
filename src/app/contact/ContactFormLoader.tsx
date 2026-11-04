"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { PageLoader } from "@/components/ui/Spinner";

// Form + validation libraries are code-split into their own chunk.
const ContactForm = dynamic(() => import("@/components/contact/ContactForm").then((m) => m.ContactForm), {
  loading: () => (
    <div className="glass rounded-[2rem]">
      <PageLoader label="Loading form" />
    </div>
  ),
});

/** Reads ?type=speaking (from Work With Me buttons) to preselect the enquiry type. */
export function ContactFormLoader() {
  const type = useSearchParams().get("type") ?? undefined;
  return <ContactForm key={type ?? "none"} defaultInquiry={type} />;
}
