/** Abstract location visual from the Claude Design canvas — illustration only, no map service. */
export function LocationMap() {
  return (
    <svg
      viewBox="0 0 700 340"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <rect width="700" height="340" fill="#EAF0F8" />
      <path d="M0 250 C90 220 140 270 230 250 C310 232 330 290 420 300 C520 312 600 280 700 300 L700 340 L0 340 Z" fill="#CFE0F6" />
      <path d="M430 0 C440 60 400 90 440 140 C470 175 540 160 580 200 C610 230 660 220 700 235 L700 0 Z" fill="#DCE8F8" />
      <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
        <path d="M-10 120 C120 110 220 150 360 130 S600 90 710 110" strokeWidth="12" />
        <path d="M90 -10 C110 80 80 160 120 260" strokeWidth="10" />
        <path d="M250 -10 C240 70 290 130 270 240" strokeWidth="14" />
        <path d="M0 40 L420 70" strokeWidth="7" />
        <path d="M150 190 L400 215" strokeWidth="7" />
        <path d="M330 120 C350 170 340 210 380 260" strokeWidth="7" />
        <path d="M30 200 L220 175" strokeWidth="6" />
      </g>
      <circle cx="300" cy="150" r="64" fill="#0B63D6" opacity="0.12" />
      <circle cx="300" cy="150" r="30" fill="#0B63D6" opacity="0.18" />
      <circle cx="300" cy="150" r="13" fill="#0B63D6" stroke="#FFFFFF" strokeWidth="5" />
    </svg>
  );
}
