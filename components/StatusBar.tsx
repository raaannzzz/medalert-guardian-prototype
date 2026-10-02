const ITEMS = ["Connected", "GPS Active", "Fall Detection Active"];

export function StatusDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block size-2.5 shrink-0 rounded-full bg-green-dot ${className}`}
    />
  );
}

/** The product-status treatment shared by the homepage hero and Guardian Login. */
export function StatusBar({ caption }: { caption?: string }) {
  return (
    <div className="absolute inset-x-3 bottom-3 flex flex-col gap-3 rounded-[20px] bg-white px-3.5 py-3 shadow-[0_12px_32px_rgba(14,27,51,0.12),0_0_0_1px_#d8e0ec] min-[900px]:inset-x-5 min-[900px]:bottom-5 min-[900px]:px-[22px] min-[900px]:py-4">
      {caption && <p className="text-[15px] font-medium text-ink-2">{caption}</p>}
      <ul className="flex flex-wrap justify-between gap-x-4 gap-y-2">
        {ITEMS.map((label) => (
          <li key={label} className="flex items-center gap-2.5 text-[16px] font-semibold min-[900px]:text-[17px]">
            <StatusDot />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
