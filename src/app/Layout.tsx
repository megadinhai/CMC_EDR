import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { DateTimePicker } from "@/components/filters/DateTimePicker";
import { NoDataToggle } from "@/components/filters/NoDataToggle";
import { TenantFilter } from "@/components/filters/TenantFilter";
import { Sidebar } from "@/components/layout/Sidebar";
import { useRefreshAll } from "@/api/hooks";

function RefreshButton() {
  const { refreshAll, isRefreshing } = useRefreshAll();
  return (
    <button
      type="button"
      onClick={refreshAll}
      disabled={isRefreshing}
      title="Refresh"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[5px] border border-white/20 bg-white/0 text-white/80 hover:border-white/40 disabled:opacity-60"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={clsx(isRefreshing && "animate-spin")}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 4v5h5M20 20v-5h-5M4.5 9a8 8 0 0114-4.5M19.5 15a8 8 0 01-14 4.5"
        />
      </svg>
    </button>
  );
}

function Breadcrumb() {
  return (
    <div className="flex items-center gap-2.5 text-base font-semibold">
      <span className="text-primary">General</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/40">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      </svg>
      <span className="text-white/20">Dashboard</span>
    </div>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar expanded={sidebarExpanded} onToggle={() => setSidebarExpanded((v) => !v)} />
      <div className="min-w-0 flex-1">
        <header className="border-b border-surface-border px-10 py-8">
          <div className="mx-auto flex max-w-[1920px] items-start justify-between gap-4">
            <div className="flex flex-col gap-5">
              <Breadcrumb />
              <h1 className="text-[35px] font-bold leading-none text-white">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <NoDataToggle />
              <TenantFilter />
              <DateTimePicker />
              <RefreshButton />
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1920px] px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
