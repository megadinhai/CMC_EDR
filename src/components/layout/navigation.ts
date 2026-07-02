import type { ComponentType } from "react";
import type { IconProps } from "./navIcons";
import {
  BellIcon,
  BuildingIcon,
  BugIcon,
  ChartLineIcon,
  FileTextIcon,
  FilterListIcon,
  GridIcon,
  KeyIcon,
  LayoutGridIcon,
  ListIcon,
  MatrixIcon,
  MonitorIcon,
  PieChartIcon,
  PolicyIcon,
  SearchFileIcon,
  SearchShieldIcon,
  ServerIcon,
  ShareIcon,
  ShieldAlertIcon,
  ShieldNetworkIcon,
  SlidersIcon,
  TargetIcon,
  UsbKeyIcon,
  UserIcon,
} from "./navIcons";

export interface NavItem {
  id: string;
  label: string;
  icon: ComponentType<IconProps>;
  /** Only "dashboard-manage" maps to a real page in this app — see Sidebar.tsx. */
  hasSubmenu?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: "Dashboards",
    items: [
      { id: "dashboard-manage", label: "Manage", icon: GridIcon },
      { id: "dashboard-playlists", label: "Playlists", icon: ListIcon },
    ],
  },
  {
    title: "Vulnerability Detection",
    items: [
      { id: "vuln-dashboard", label: "Dashboard", icon: PieChartIcon },
      { id: "vuln-list", label: "Vulnerabilities", icon: BugIcon },
    ],
  },
  {
    title: "Reporting",
    items: [
      { id: "report-malware", label: "Malware Detection", icon: ShieldAlertIcon },
      { id: "report-malicious", label: "Malicious Connection", icon: ShieldNetworkIcon },
      { id: "report-device", label: "Device Control", icon: UsbKeyIcon },
    ],
  },
  {
    title: "Security Management",
    items: [
      { id: "sec-context", label: "Context Management", icon: FilterListIcon },
      { id: "sec-detection-rule", label: "Detection Rule", icon: SearchShieldIcon },
      { id: "sec-mitre", label: "MITRE ATT&CK", icon: MatrixIcon },
      { id: "sec-policy", label: "Policy", icon: PolicyIcon },
    ],
  },
  {
    title: "System Management",
    items: [
      { id: "sys-data-sharing", label: "Data Sharing", icon: ShareIcon, hasSubmenu: true },
      { id: "sys-log", label: "System Log", icon: FileTextIcon },
      { id: "sys-agent", label: "Agent Management", icon: MonitorIcon },
    ],
  },
  {
    title: "Threat Detection, Investigation and Response",
    items: [
      { id: "tdir-alert", label: "Alert", icon: BellIcon },
      { id: "tdir-case", label: "Case Management", icon: LayoutGridIcon },
      { id: "tdir-event-explorer", label: "Event Explorer", icon: SearchFileIcon },
      { id: "tdir-live-queries", label: "Live Queries", icon: ChartLineIcon, hasSubmenu: true },
      { id: "tdir-action-center", label: "Action Center", icon: TargetIcon },
    ],
  },
  {
    title: "Configuration",
    items: [
      { id: "config-data-sources", label: "Data Sources", icon: ServerIcon },
      { id: "config-user", label: "User Management", icon: UserIcon },
      { id: "config-tenant", label: "Tenant Management", icon: KeyIcon },
      { id: "config-org", label: "Organizations", icon: BuildingIcon },
      { id: "config-preferences", label: "Preferences", icon: SlidersIcon },
    ],
  },
];

/** The only route this app actually implements — everything else is a presentational nav item per the Figma shell. */
export const ACTIVE_NAV_ID = "dashboard-manage";
