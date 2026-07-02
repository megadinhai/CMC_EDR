import clsx from "clsx";
import { NAV_SECTIONS, ACTIVE_NAV_ID } from "./navigation";
import { ChevronRightIcon, PanelToggleIcon, ShieldLogoIcon } from "./navIcons";
import type { NavItem } from "./navigation";

interface SidebarProps {
  expanded: boolean;
  onToggle: () => void;
}

function CollapsedItem({ item }: { item: NavItem }) {
  const active = item.id === ACTIVE_NAV_ID;
  const Icon = item.icon;
  return (
    <button
      type="button"
      title={item.label}
      disabled={!active}
      className={clsx(
        "flex h-10 w-full items-center justify-center border-l-2 disabled:cursor-default",
        active
          ? "border-primary bg-white/[0.04] text-white"
          : "border-transparent text-white/60 enabled:hover:text-white",
      )}
    >
      <Icon width={22} height={22} />
    </button>
  );
}

function ExpandedItem({ item }: { item: NavItem }) {
  const active = item.id === ACTIVE_NAV_ID;
  const Icon = item.icon;
  return (
    <button
      type="button"
      disabled={!active}
      className={clsx(
        "flex h-10 w-full items-center gap-1.5 border-l-2 px-2 disabled:cursor-default",
        active
          ? "border-primary bg-white/[0.08] text-white"
          : "border-transparent text-white/60 enabled:hover:text-white",
      )}
    >
      <Icon width={22} height={22} className="shrink-0" />
      <span className="flex-1 truncate text-left text-base font-medium">{item.label}</span>
      {item.hasSubmenu && <ChevronRightIcon width={16} height={16} className="shrink-0" />}
    </button>
  );
}

export function Sidebar({ expanded, onToggle }: SidebarProps) {
  return (
    <aside
      className={clsx(
        "sticky top-0 flex h-screen shrink-0 flex-col border-r border-surface-border bg-surface",
        expanded ? "w-[280px]" : "w-20",
      )}
    >
      {expanded ? (
        <div className="flex items-center justify-between px-5 py-6">
          <div className="flex items-center gap-2 text-primary">
            <ShieldLogoIcon width={26} height={26} />
            <span className="text-lg font-bold text-white">
              CMC <span className="text-primary">EDR</span>
            </span>
          </div>
          <button
            type="button"
            onClick={onToggle}
            title="Collapse sidebar"
            className="shrink-0 text-white/60 hover:text-white"
          >
            <PanelToggleIcon width={22} height={22} />
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 py-6">
          <button
            type="button"
            onClick={onToggle}
            title="Expand sidebar"
            className="text-primary hover:text-white"
          >
            <ShieldLogoIcon width={26} height={26} />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto pb-4">
        {NAV_SECTIONS.map((section, idx) => (
          <div key={section.title} className={clsx(expanded && "px-5", idx > 0 && (expanded ? "mt-4" : "mt-3"))}>
            {expanded ? (
              <p className="mb-1 truncate text-xs text-white/60">{section.title}</p>
            ) : (
              idx > 0 && <div className="mx-auto mb-3 h-px w-6 bg-white/15" />
            )}
            <div className="flex flex-col gap-1">
              {section.items.map((item) =>
                expanded ? (
                  <ExpandedItem key={item.id} item={item} />
                ) : (
                  <CollapsedItem key={item.id} item={item} />
                ),
              )}
            </div>
          </div>
        ))}
      </nav>

      <div className={clsx("border-t border-surface-border py-4", expanded ? "px-5" : "flex justify-center")}>
        {expanded ? (
          <button type="button" className="flex h-10 w-full items-center gap-1.5 px-2 text-white/60 hover:text-white">
            <span className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/80">
              H
            </span>
            <span className="flex-1 truncate text-left text-base font-medium">Hanh chen</span>
            <ChevronRightIcon width={16} height={16} className="shrink-0" />
          </button>
        ) : (
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white/10 text-xs text-white/80">
            H
          </span>
        )}
      </div>
    </aside>
  );
}
