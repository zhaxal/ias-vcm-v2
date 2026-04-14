import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { cx } from "./utils";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

export type SearchableSelectProps = {
  label?: string;
  hint?: string;
  error?: string;
  name?: string;
  options: SelectOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: string) => void;
};

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, hint, error, id, options, placeholder, ...props }, ref) => {
    const resolvedId = id ?? props.name;

    return (
      <label className="block space-y-2" htmlFor={resolvedId}>
        {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
        <div className="relative">
          <select
            ref={ref}
            id={resolvedId}
            className={cx(
              "h-11 w-full appearance-none rounded-xl border bg-slate-950/40 px-3 pr-10 text-sm text-slate-100 outline-none transition",
              error
                ? "border-rose-400/70 focus:border-rose-300 focus:ring-2 focus:ring-rose-300/40"
                : "border-slate-700/80 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/40",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            ▾
          </span>
        </div>
        {error ? (
          <span className="text-xs text-rose-300">{error}</span>
        ) : (
          hint && <span className="text-xs text-slate-400">{hint}</span>
        )}
      </label>
    );
  }
);

Select.displayName = "Select";

export function SearchableSelect({
  label,
  hint,
  error,
  name,
  options,
  placeholder = "Choose an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found",
  value,
  defaultValue,
  disabled,
  className,
  onValueChange,
}: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const rootRef = useRef<HTMLDivElement>(null);

  const selectedValue = value ?? internalValue;
  const selectedOption = options.find((option) => option.value === selectedValue);

  const filteredOptions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return options;
    }

    return options.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [options, query]);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentClick);

    return () => {
      document.removeEventListener("mousedown", onDocumentClick);
    };
  }, []);

  const handleSelect = (nextValue: string) => {
    if (value === undefined) {
      setInternalValue(nextValue);
    }

    onValueChange?.(nextValue);
    setIsOpen(false);
    setQuery("");
  };

  const triggerClasses = cx(
    "h-11 w-full rounded-xl border bg-slate-950/40 px-3 text-left text-sm outline-none transition",
    "focus-visible:ring-2",
    error
      ? "border-rose-400/70 text-slate-100 focus-visible:border-rose-300 focus-visible:ring-rose-300/40"
      : "border-slate-700/80 text-slate-100 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/40",
    disabled && "cursor-not-allowed opacity-60",
    className
  );

  return (
    <div ref={rootRef} className="block space-y-2">
      {label && <span className="text-sm font-medium text-slate-200">{label}</span>}
      <div className="relative">
        {name && <input type="hidden" name={name} value={selectedValue} />}
        <button
          type="button"
          className={triggerClasses}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className={selectedOption ? "text-slate-100" : "text-slate-500"}>
            {selectedOption?.label ?? placeholder}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-400">
            ▾
          </span>
        </button>

        {isOpen && (
          <div className="absolute z-20 mt-2 w-full rounded-xl border border-slate-700/80 bg-slate-950 p-2 shadow-[0_18px_45px_-24px_rgba(2,6,23,0.95)]">
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="mb-2 h-10 w-full rounded-lg border border-slate-700/80 bg-slate-900 px-3 text-sm text-slate-100 outline-none placeholder:text-slate-500 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-300/30"
            />
            <ul className="max-h-56 overflow-auto" role="listbox">
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-sm text-slate-400">{emptyText}</li>
              )}
              {filteredOptions.map((option) => (
                <li key={option.value}>
                  <button
                    type="button"
                    disabled={option.disabled}
                    onClick={() => handleSelect(option.value)}
                    className={cx(
                      "w-full rounded-lg px-3 py-2 text-left text-sm transition",
                      option.value === selectedValue
                        ? "bg-cyan-500/20 text-cyan-200"
                        : "text-slate-200 hover:bg-slate-800",
                      option.disabled && "cursor-not-allowed opacity-50"
                    )}
                  >
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-rose-300">{error}</span>
      ) : (
        hint && <span className="text-xs text-slate-400">{hint}</span>
      )}
    </div>
  );
}
