import { useLang } from "../i18n/LangContext";
import type { Lang } from "../types";

const OPTIONS: Lang[] = ["uk", "en", "ru"];
const LABELS: Record<Lang, string> = { uk: "УКР", en: "ENG", ru: "РУС" };

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex items-center gap-0.5 rounded-full bg-white/70 p-0.5 shadow-soft">
      {OPTIONS.map((option) => {
        const active = option === lang;
        return (
          <button
            key={option}
            type="button"
            onClick={() => setLang(option)}
            aria-label={`VelvetBloom: ${LABELS[option]}`}
            className={`rounded-full px-2 py-1 text-[10px] font-semibold tracking-wide transition-colors ${
              active ? "bg-terracotta text-cream" : "text-ink/50"
            }`}
          >
            {LABELS[option]}
          </button>
        );
      })}
    </div>
  );
}
