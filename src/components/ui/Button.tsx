import { ButtonHTMLAttributes, forwardRef } from "react";

import { cx } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-cyan-500 text-slate-950 shadow-[0_12px_30px_-14px_rgba(34,211,238,0.8)] hover:bg-cyan-400",
  secondary:
    "bg-white/70 text-slate-900 ring-1 ring-slate-200 backdrop-blur-sm hover:bg-white",
  ghost: "bg-transparent text-slate-100 ring-1 ring-white/20 hover:bg-white/10",
  danger:
    "bg-rose-500 text-white shadow-[0_12px_30px_-14px_rgba(244,63,94,0.8)] hover:bg-rose-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cx(
          "inline-flex items-center justify-center rounded-xl font-semibold transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
