import { HTMLAttributes } from "react";

import { cx } from "./utils";

type BadgeTone = "neutral" | "success" | "warning" | "info";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: BadgeTone;
};

const toneClasses: Record<BadgeTone, string> = {
  neutral: "bg-slate-200/60 text-slate-800",
  success: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30",
  warning: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30",
  info: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30",
};

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide",
        toneClasses[tone],
        className
      )}
      {...props}
    />
  );
}
