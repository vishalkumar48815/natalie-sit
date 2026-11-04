import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type Variant = "primary" | "glass" | "outline" | "ghost";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white shadow-[0_14px_40px_-12px_rgb(91_60_242/0.65)] hover:shadow-[0_18px_50px_-10px_rgb(123_60_242/0.8)] hover:-translate-y-0.5",
  glass: "glass text-ink hover:-translate-y-0.5 hover:bg-white/90",
  outline: "border border-violet/30 bg-white/40 text-ink hover:border-violet hover:bg-white/80",
  ghost: "text-ink hover:text-violet",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type LinkButtonProps = CommonProps & { href: string; external?: boolean };
type NativeButtonProps = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
    loading?: boolean;
  };

function Inner({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          aria-hidden
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </>
  );
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = "primary", size = "md", arrow, className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          <Inner arrow={arrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        <Inner arrow={arrow}>{children}</Inner>
      </Link>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, variant: _v, size: _s, arrow: _a, className: _c, children: _ch, ...rest } = props;
  return (
    <button {...rest} disabled={loading || rest.disabled} aria-busy={loading} className={classes}>
      {loading ? (
        <>
          <Spinner size="sm" tone="light" />
          <span>Sending…</span>
        </>
      ) : (
        <Inner arrow={arrow}>{children}</Inner>
      )}
    </button>
  );
}
