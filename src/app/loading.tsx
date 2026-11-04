import { PageLoader } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="aurora pt-24">
      <PageLoader label="Loading" />
    </div>
  );
}
