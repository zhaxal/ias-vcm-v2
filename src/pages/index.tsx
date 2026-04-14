export default function Home() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_24px_60px_-30px_rgba(2,6,23,0.95)] backdrop-blur">
        <h1 className="text-2xl font-semibold text-slate-100">
          Sidebar usage example
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          This page demonstrates how to compose <code>SidebarLayout</code> with
          the reusable sidebar primitives. The current route is used for{" "}
          <code>activeHref</code>, and nav/profile/footer are passed via the
          <code>sidebar</code> prop.
        </p>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
        <h2 className="text-base font-semibold text-slate-100">
          What this page is passing
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-300">
          <li>title/subtitle for sidebar header</li>
          <li>
            typed nav items array as <code>SidebarNavItem[]</code>
          </li>
          <li>
            route-aware active item using <code>useRouter().pathname</code>
          </li>
          <li>profile card with action button</li>
          <li>sidebar footer and custom mobile header slot</li>
        </ul>
      </section>
    </div>
  );
}
