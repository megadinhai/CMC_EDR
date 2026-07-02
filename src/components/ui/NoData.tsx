export function NoData() {
  return (
    <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 text-slate-500">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 3l18 18M9 9a3 3 0 104.24 4.24M12 4.5C7 4.5 3 8 1.5 12c.51 1.28 1.28 2.46 2.24 3.46M21.5 12A11.9 11.9 0 0118 16.5"
        />
      </svg>
      <span className="text-sm font-medium">No Data</span>
    </div>
  );
}
