import {
  AnchorHTMLAttributes,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useEffect,
} from "react";
import Link from "next/link";

import { cx } from "./utils";

export type SidebarNavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export type SidebarProfile = {
  name: string;
  subtitle?: string;
  avatar?: ReactNode;
  action?: ReactNode;
};

export type SidebarProps = HTMLAttributes<HTMLElement> & {
  title?: string;
  subtitle?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  items?: SidebarNavItem[];
  activeHref?: string;
  navigationLabel?: string;
  profile?: SidebarProfile;
  footer?: ReactNode;
};

export type SidebarHeaderProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
  subtitle?: string;
  onClose?: () => void;
};

export function SidebarHeader({
  className,
  title,
  subtitle,
  onClose,
  ...props
}: SidebarHeaderProps) {
  return (
    <header
      className={cx("border-b border-white/10 px-4 pb-4 pt-5 sm:px-5", className)}
      {...props}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          {title && <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{title}</p>}
          {subtitle && <h2 className="text-lg font-semibold text-slate-50">{subtitle}</h2>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
          aria-label="Close sidebar"
        >
          x
        </button>
      </div>
    </header>
  );
}

export type SidebarContentProps = HTMLAttributes<HTMLDivElement>;

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cx("flex min-h-0 flex-1 flex-col gap-4 p-4 sm:p-5", className)} {...props} />;
}

export type SidebarNavProps = HTMLAttributes<HTMLElement> & {
  label?: string;
};

export function SidebarNav({ className, label = "Sidebar navigation", ...props }: SidebarNavProps) {
  return <nav aria-label={label} className={cx("space-y-1", className)} {...props} />;
}

export type SidebarItemProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  active?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
};

export function SidebarItem({
  className,
  href,
  active = false,
  disabled = false,
  icon,
  badge,
  children,
  onClick,
  ...props
}: SidebarItemProps) {
  const isInternalHref = href.startsWith("/") || href.startsWith("#");

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  const itemClassName = cx(
    "group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300",
    active
      ? "bg-cyan-500/15 text-cyan-200 ring-1 ring-cyan-400/40"
      : "text-slate-300 hover:bg-white/5 hover:text-white",
    disabled && "cursor-not-allowed opacity-45",
    className
  );

  const itemContent = (
    <>
      {icon && (
        <span
          className={cx(
            "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
            active ? "border-cyan-300/40 bg-cyan-300/15" : "border-white/10 bg-white/5"
          )}
        >
          {icon}
        </span>
      )}
      <span className="min-w-0 flex-1 truncate">{children}</span>
      {badge && <span className="shrink-0 text-xs text-slate-400">{badge}</span>}
    </>
  );

  if (isInternalHref) {
    return (
      <Link
        href={href}
        className={itemClassName}
        aria-current={active ? "page" : undefined}
        aria-disabled={disabled || undefined}
        onClick={handleClick}
        {...props}
      >
        {itemContent}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={itemClassName}
      aria-current={active ? "page" : undefined}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      {...props}
    >
      {itemContent}
    </a>
  );
}

export type SidebarProfileCardProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  subtitle?: string;
  avatar?: ReactNode;
  action?: ReactNode;
};

export function SidebarProfileCard({
  className,
  name,
  subtitle,
  avatar,
  action,
  ...props
}: SidebarProfileCardProps) {
  return (
    <div
      className={cx(
        "mt-auto rounded-2xl border border-white/10 bg-slate-900/70 p-3 backdrop-blur",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-slate-800 text-sm font-semibold text-slate-100">
          {avatar ?? name.slice(0, 1).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-100">{name}</p>
          {subtitle && <p className="truncate text-xs text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export type SidebarFooterProps = HTMLAttributes<HTMLDivElement>;

export function SidebarFooter({ className, ...props }: SidebarFooterProps) {
  return <footer className={cx("border-t border-white/10 px-4 py-3 sm:px-5", className)} {...props} />;
}

export function Sidebar({
  className,
  title = "Workspace",
  subtitle = "Navigation",
  open = false,
  onOpenChange,
  items = [],
  activeHref,
  navigationLabel = "Sidebar navigation",
  profile,
  footer,
  ...props
}: SidebarProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange?.(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onOpenChange]);

  const close = () => onOpenChange?.(false);

  return (
    <>
      <div
        className={cx(
          "fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-[1px] transition-opacity duration-200 md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={close}
        aria-hidden="true"
      />

      <aside
        className={cx(
          "fixed inset-y-0 left-0 z-50 flex h-full w-72 max-w-[86vw] flex-col overflow-y-auto border-r border-white/10 bg-slate-950/95 shadow-[0_24px_80px_-20px_rgba(2,6,23,0.85)] backdrop-blur-md transition-transform duration-300 ease-out md:fixed md:z-20 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          className
        )}
        {...props}
      >
        <SidebarHeader title={title} subtitle={subtitle} onClose={close} />
        <SidebarContent>
          <SidebarNav label={navigationLabel}>
            {items.map((item) => (
              <SidebarItem
                key={item.href}
                href={item.href}
                icon={item.icon}
                badge={item.badge}
                active={item.href === activeHref}
                disabled={item.disabled}
                onClick={(event) => {
                  item.onClick?.(event);
                  if (!event.defaultPrevented) {
                    close();
                  }
                }}
              >
                {item.label}
              </SidebarItem>
            ))}
          </SidebarNav>

          {profile && (
            <SidebarProfileCard
              name={profile.name}
              subtitle={profile.subtitle}
              avatar={profile.avatar}
              action={profile.action}
            />
          )}
        </SidebarContent>
        {footer && <SidebarFooter>{footer}</SidebarFooter>}
      </aside>
    </>
  );
}
