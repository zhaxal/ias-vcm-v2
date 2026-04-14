import { HTMLAttributes, ReactNode, useMemo, useState } from "react";

import { Sidebar, SidebarProps } from "@/components/ui/Sidebar";
import { cx } from "@/components/ui/utils";

export type SidebarLayoutProps = HTMLAttributes<HTMLDivElement> & {
  sidebar: Omit<SidebarProps, "open" | "onOpenChange">;
  children: ReactNode;
  contentClassName?: string;
  mobileHeaderSlot?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function SidebarLayout({
  className,
  sidebar,
  children,
  contentClassName,
  mobileHeaderSlot,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  ...props
}: SidebarLayoutProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = typeof openProp === "boolean";
  const open = isControlled ? openProp : uncontrolledOpen;

  const sidebarId = useMemo(() => sidebar.id ?? "app-sidebar", [sidebar.id]);

  const setOpen = (nextOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  };

  return (
    <div
      className={cx(
        "relative min-h-screen bg-slate-950 text-slate-100 md:pl-72",
        className
      )}
      {...props}
    >
      <Sidebar {...sidebar} id={sidebarId} open={open} onOpenChange={setOpen} />

      <div className="flex min-h-screen flex-col md:min-h-0">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-white/10 bg-slate-950/90 px-4 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Open sidebar"
            aria-expanded={open}
            aria-controls={sidebarId}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-slate-100 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
          >
            <span className="sr-only">Toggle sidebar</span>
            <span aria-hidden="true">≡</span>
          </button>
          {mobileHeaderSlot ?? (
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-100">{sidebar.subtitle ?? "Navigation"}</p>
            </div>
          )}
        </header>

        <main className={cx("min-h-0 flex-1 p-4 sm:p-6 lg:p-8", contentClassName)}>{children}</main>
      </div>
    </div>
  );
}
