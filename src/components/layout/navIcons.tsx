import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="12" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="12" width="7" height="7" rx="1.5" />
      <rect x="12" y="12" width="7" height="7" rx="1.5" />
    </Icon>
  );
}

export function ListIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h14M4 11h14M4 16h9" />
    </Icon>
  );
}

export function PieChartIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11 3a8 8 0 108 8h-8V3z" />
    </Icon>
  );
}

export function BugIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="7" y="7" width="8" height="10" rx="4" />
      <path d="M11 7V5M8 9l-3-2M14 9l3-2M8 14l-3 2M14 14l3 2M8 7a3 3 0 016 0" />
    </Icon>
  );
}

export function ShieldAlertIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11 3l7 3v5c0 4.5-3 7-7 8-4-1-7-3.5-7-8V6l7-3z" />
      <path d="M11 8v4M11 15h.01" />
    </Icon>
  );
}

export function ShieldNetworkIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M11 3l7 3v5c0 4.5-3 7-7 8-4-1-7-3.5-7-8V6l7-3z" />
      <path d="M8 12a3 3 0 016 0M9.5 14a1 1 0 013 0" />
    </Icon>
  );
}

export function UsbKeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="6" y="4" width="10" height="6" rx="1.5" />
      <path d="M9 10v3a2 2 0 002 2 2 2 0 002-2v-3M11 15v3" />
    </Icon>
  );
}

export function FilterListIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 6h14M7 11h8M9.5 16h3" />
    </Icon>
  );
}

export function SearchShieldIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="9.5" cy="9.5" r="5.5" />
      <path d="M17 17l-3.8-3.8" />
    </Icon>
  );
}

export function MatrixIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="16" height="16" rx="1.5" />
      <path d="M3 9h16M3 14h16M9 3v16M14 3v16" />
    </Icon>
  );
}

export function PolicyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h7l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M13 3v4h4M8 12l2 2 4-4" />
    </Icon>
  );
}

export function ShareIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="6" cy="11" r="2.2" />
      <circle cx="16" cy="5" r="2.2" />
      <circle cx="16" cy="17" r="2.2" />
      <path d="M8 9.8L14 6.2M8 12.2l6 3.6" />
    </Icon>
  );
}

export function FileTextIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h7l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
      <path d="M13 3v4h4M8 12h6M8 15h6" />
    </Icon>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="16" height="11" rx="1.5" />
      <path d="M8 19h6M11 15v4" />
    </Icon>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9a5 5 0 0110 0c0 4 1.5 5 1.5 5h-13S6 13 6 9z" />
      <path d="M9.5 17a1.7 1.7 0 003 0" />
    </Icon>
  );
}

export function LayoutGridIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="7" height="16" rx="1.5" />
      <rect x="12" y="3" width="7" height="7" rx="1.5" />
      <rect x="12" y="12" width="7" height="7" rx="1.5" />
    </Icon>
  );
}

export function SearchFileIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 3h7l4 4v4" />
      <path d="M13 3v4h4M6 20V4" />
      <circle cx="9.5" cy="14.5" r="3" />
      <path d="M12 17l2 2" />
    </Icon>
  );
}

export function ChartLineIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 18V4M4 18h14" />
      <path d="M6 15l3.5-4.5L12 13l4.5-6" />
    </Icon>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <circle cx="11" cy="11" r="3.2" />
      <path d="M11 3v3M11 16v3M3 11h3M16 11h3" />
    </Icon>
  );
}

export function ServerIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="16" height="5.5" rx="1.5" />
      <rect x="3" y="12.5" width="16" height="5.5" rx="1.5" />
      <path d="M6.5 6.75h.01M6.5 15.25h.01" />
    </Icon>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="7.5" r="3.5" />
      <path d="M4.5 19c0-3.6 3-6 6.5-6s6.5 2.4 6.5 6" />
    </Icon>
  );
}

export function KeyIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="7" cy="14" r="3.5" />
      <path d="M9.5 11.5L17 4M14 7l2 2M17 4l2 2" />
    </Icon>
  );
}

export function BuildingIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="12" height="16" rx="1" />
      <path d="M8 7h1M13 7h1M8 11h1M13 11h1M8 15h1M13 15h1" />
    </Icon>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M5 5v6M5 15v2M11 5v2M11 11v6M17 5v10M17 19v-2" />
      <circle cx="5" cy="13" r="2" />
      <circle cx="11" cy="9" r="2" />
      <circle cx="17" cy="17" r="2" />
    </Icon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function ShieldLogoIcon(props: IconProps) {
  return (
    <Icon {...props} strokeWidth="1.5">
      <path d="M11 2.5l7.5 3v5.5c0 5-3.2 8-7.5 9.5-4.3-1.5-7.5-4.5-7.5-9.5V5.5l7.5-3z" />
      <path d="M7.8 11l2.2 2.2 4.2-4.6" />
    </Icon>
  );
}

export function PanelToggleIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="16" height="14" rx="2" />
      <path d="M9 4v14" />
    </Icon>
  );
}
