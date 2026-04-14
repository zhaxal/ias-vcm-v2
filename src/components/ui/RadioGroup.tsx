import { useId } from "react";

import { cx } from "./utils";

type RadioOption = {
  label: string;
  value: string;
  hint?: string;
  disabled?: boolean;
};

export type RadioGroupProps = {
  name: string;
  options: RadioOption[];
  label?: string;
  hint?: string;
  error?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

export function RadioGroup({
  name,
  options,
  label,
  hint,
  error,
  value,
  defaultValue,
  disabled,
  className,
  onValueChange,
}: RadioGroupProps) {
  const groupId = useId();
  const fallbackDefault = defaultValue ?? options[0]?.value;

  return (
    <fieldset className={cx("space-y-2", className)} disabled={disabled}>
      {label && <legend className="text-sm font-medium text-slate-200">{label}</legend>}
      <div className="space-y-2">
        {options.map((option) => {
          const optionId = `${groupId}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={cx(
                "flex cursor-pointer items-start gap-3 rounded-xl border bg-slate-950/40 px-3 py-2.5 transition",
                error
                  ? "border-rose-400/70"
                  : "border-slate-700/80 hover:border-cyan-300/60 hover:bg-slate-900/80",
                (disabled || option.disabled) && "cursor-not-allowed opacity-55"
              )}
            >
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value !== undefined ? value === option.value : undefined}
                defaultChecked={value === undefined ? fallbackDefault === option.value : undefined}
                disabled={disabled || option.disabled}
                onChange={(event) => onValueChange?.(event.target.value)}
                className="mt-1 h-4 w-4 border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-300/40"
              />
              <span className="space-y-1">
                <span className="block text-sm font-medium text-slate-100">{option.label}</span>
                {option.hint && <span className="block text-xs text-slate-400">{option.hint}</span>}
              </span>
            </label>
          );
        })}
      </div>
      {error ? (
        <p className="text-xs text-rose-300">{error}</p>
      ) : (
        hint && <p className="text-xs text-slate-400">{hint}</p>
      )}
    </fieldset>
  );
}
