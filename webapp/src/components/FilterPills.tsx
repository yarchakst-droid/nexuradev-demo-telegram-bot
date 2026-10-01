import { useLang } from "../i18n/LangContext";
import type { Occasion } from "../types";

const OCCASION_KEYS: (Occasion | "all")[] = ["all", "birthday", "wedding", "justBecause", "romance"];

interface Props {
  active: Occasion | "all";
  onChange: (v: Occasion | "all") => void;
}

export default function FilterPills({ active, onChange }: Props) {
  const { t } = useLang();

  return (
    <div className="scrollbar-hidden flex gap-2 overflow-x-auto pb-1">
      {OCCASION_KEYS.map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`relative flex min-h-[40px] shrink-0 items-center rounded-full px-4 text-sm font-medium transition-colors ${
              isActive ? "text-cream" : "text-ink/70 hover:text-ink"
            }`}
          >
            {isActive && <span className="absolute inset-0 rounded-full bg-terracotta" />}
            <span className="relative">{t.filters[key]}</span>
          </button>
        );
      })}
    </div>
  );
}
