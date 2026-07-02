interface ErrorStateProps {
  message?: string;
}

export function ErrorState({ message = "Failed to load data" }: ErrorStateProps) {
  return (
    <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-2 text-severity-critical">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M12 8v5M12 16h.01" />
      </svg>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
