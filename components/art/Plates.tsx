/**
 * Decorative line work. All server rendered, all aria-hidden, no image files.
 */

/** Ornamental section rule carrying crop marks and the section index. */
export function PlateRule({ index, label }: { index: string; label: string }) {
  return (
    <div className="plate-rule">
      <span className="mono-label plate-rule-num">{index}</span>
      <svg viewBox="0 0 640 12" preserveAspectRatio="none" className="plate-rule-svg" aria-hidden>
        <path d="M0 6h640" stroke="currentColor" strokeWidth="1" opacity="0.28" />
        <path d="M0 1v10M160 3v6M320 1v10M480 3v6M639 1v10" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
      <span className="mono-label plate-rule-label">{label}</span>
    </div>
  );
}

/**
 * The about section plate: an exploded set of layered frames with a hairline
 * grid inside, drawn as one continuous line illustration.
 */
export function AboutPlate() {
  return (
    <svg viewBox="0 0 320 300" className="about-plate" aria-hidden>
      <defs>
        <pattern id="platePattern" width="14" height="14" patternUnits="userSpaceOnUse">
          <path d="M14 0H0v14" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
        </pattern>
      </defs>

      {/* three stacked plates, receding */}
      <g stroke="currentColor" fill="none">
        <rect x="30" y="66" width="196" height="150" strokeWidth="1" opacity="0.22" transform="rotate(-7 128 141)" />
        <rect x="52" y="54" width="196" height="150" strokeWidth="1" opacity="0.4" transform="rotate(-3 150 129)" />
      </g>

      <g transform="rotate(1.5 176 128)">
        <rect x="78" y="44" width="196" height="150" fill="var(--bg-raised)" stroke="currentColor" strokeWidth="1.4" />
        <rect x="78" y="44" width="196" height="150" fill="url(#platePattern)" opacity="0.6" />
        {/* a miniature of this very page */}
        <rect x="92" y="58" width="52" height="6" fill="var(--pc-active)" />
        <rect x="92" y="74" width="128" height="9" fill="currentColor" opacity="0.55" />
        <rect x="92" y="90" width="104" height="9" fill="currentColor" opacity="0.4" />
        <rect x="92" y="112" width="168" height="1" fill="currentColor" opacity="0.3" />
        <g fill="currentColor" opacity="0.28">
          <rect x="92" y="124" width="38" height="30" />
          <rect x="136" y="124" width="38" height="30" />
          <rect x="180" y="124" width="38" height="30" />
          <rect x="224" y="124" width="36" height="30" />
        </g>
        <rect x="92" y="166" width="74" height="6" fill="currentColor" opacity="0.35" />
      </g>

      {/* crop marks */}
      <g stroke="var(--pc-active)" strokeWidth="1.2" opacity="0.75">
        <path d="M16 20h14M23 13v14" />
        <path d="M292 268h14M299 261v14" />
      </g>
    </svg>
  );
}

/** Large footer line drawing: a fanned set of sheets over a rule. */
export function ColophonPlate() {
  return (
    <svg viewBox="0 0 460 150" className="colophon-plate" aria-hidden>
      <g stroke="currentColor" fill="none" strokeWidth="1">
        <rect x="40" y="30" width="88" height="112" opacity="0.16" transform="rotate(-11 84 86)" />
        <rect x="62" y="26" width="88" height="112" opacity="0.26" transform="rotate(-6 106 82)" />
        <rect x="84" y="22" width="88" height="112" opacity="0.4" transform="rotate(-2 128 78)" />
      </g>
      <rect x="106" y="20" width="88" height="112" fill="var(--bg-raised)" stroke="currentColor" strokeWidth="1.3" />
      <rect x="106" y="20" width="4" height="112" fill="var(--pc-active)" />
      <g fill="currentColor" opacity="0.4">
        <rect x="120" y="36" width="46" height="5" />
        <rect x="120" y="50" width="60" height="4" />
        <rect x="120" y="60" width="52" height="4" />
        <rect x="120" y="80" width="60" height="1" />
        <rect x="120" y="90" width="36" height="4" />
      </g>

      {/* the rule and a small orbit */}
      <path d="M230 132h200" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <circle cx="330" cy="72" r="42" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.25" />
      <circle cx="330" cy="72" r="24" fill="none" stroke="var(--pc-active)" strokeWidth="1.2" opacity="0.6" />
      <circle cx="330" cy="30" r="4" fill="var(--pc-active)" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.28">
        <path d="M410 40h14M417 33v14" />
      </g>
    </svg>
  );
}
