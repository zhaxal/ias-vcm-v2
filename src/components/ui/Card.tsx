import { HTMLAttributes, ReactNode } from "react";

import { cx } from "./utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
};

export function Card({
  className,
  title,
  subtitle,
  actions,
  children,
  ...props
}: CardProps) {
  return (
    <section
      className={cx(
        "rounded-2xl border border-white/10 bg-slate-900/65 p-5 shadow-[0_24px_60px_-30px_rgba(2,6,23,0.95)] backdrop-blur",
        className
      )}
      {...props}
    >
      {(title || subtitle || actions) && (
        <header className="mb-4 flex items-start justify-between gap-4">
          <div className="space-y-1">
            {title && <h3 className="text-base font-semibold text-slate-50">{title}</h3>}
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </header>
      )}
      {children}
    </section>
  );
}
