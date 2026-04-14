import { InputHTMLAttributes } from "react";

import { cx } from "./utils";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  error?: string;
};

export function Checkbox({ className, label, hint, error, id, ...props }: CheckboxProps) {
  const resolvedId = id ?? props.name;

  return (
    <label htmlFor={resolvedId} className="block space-y-1.5">
      <span
        className={cx(
          "flex items-start gap-3 rounded-xl border bg-slate-950/40 px-3 py-2.5 transition",
          error
            ? "border-rose-400/70"
            : "border-slate-700/80 hover:border-cyan-300/60 hover:bg-slate-900/80",
          props.disabled && "cursor-not-allowed opacity-55",
          className
        )}
      >
        <input
          id={resolvedId}
          type="checkbox"
          className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-300/40"
          {...props}
        />
        <span className="space-y-1">
          <span className="block text-sm font-medium text-slate-100">{label}</span>
          {hint && !error && <span className="block text-xs text-slate-400">{hint}</span>}
        </span>
      </span>
      {error && <span className="block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
