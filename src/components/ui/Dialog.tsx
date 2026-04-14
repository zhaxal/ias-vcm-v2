import { ReactNode, useEffect, useId } from "react";
import { createPortal } from "react-dom";

import { cx } from "./utils";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  size?: DialogSize;
  className?: string;
  closeLabel?: string;
  hideCloseButton?: boolean;
};

const sizeClasses: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  size = "md",
  className,
  closeLabel = "Close dialog",
  hideCloseButton,
}: DialogProps) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label={closeLabel}
        className="absolute inset-0 cursor-default bg-slate-950/80 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        className={cx(
          "relative z-10 w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950 shadow-[0_32px_80px_-32px_rgba(2,6,23,0.95)]",
          sizeClasses[size],
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div className="space-y-1">
            <h2 id={titleId} className="text-lg font-semibold text-slate-50">
              {title}
            </h2>
            {description && (
              <p id={descriptionId} className="text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>
          {!hideCloseButton && (
            <button
              type="button"
              aria-label={closeLabel}
              onClick={() => onOpenChange(false)}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              ×
            </button>
          )}
        </div>

        <div className="px-6 py-5 text-sm text-slate-200">{children}</div>

        {actions && (
          <div className="flex flex-wrap justify-end gap-3 border-t border-white/10 px-6 py-4">
            {actions}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
