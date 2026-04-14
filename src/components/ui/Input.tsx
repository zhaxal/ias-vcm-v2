import { InputHTMLAttributes, forwardRef } from "react";

import { cx } from "./utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, hint, error, id, ...props }, ref) => {
    const resolvedId = id ?? props.name;

    return (
      <label className="block space-y-2" htmlFor={resolvedId}>
        {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
        <input
          ref={ref}
          id={resolvedId}
          className={cx(
            "h-11 w-full rounded-xl border bg-slate-950/40 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500",
            error
              ? "border-rose-400/70 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/40"
              : "border-slate-700/80 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40",
            className
          )}
          {...props}
        />
        {error ? (
          <span className="text-xs text-rose-300">{error}</span>
        ) : (
          hint && <span className="text-xs text-slate-400">{hint}</span>
        )}
      </label>
    );
  }
);

Input.displayName = "Input";
