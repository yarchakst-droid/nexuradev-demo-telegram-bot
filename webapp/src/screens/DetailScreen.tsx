import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { Bouquet } from "../types";
import RevealImage from "../components/RevealImage";
import ScreenHeader from "../components/ScreenHeader";

interface Props {
  bouquet: Bouquet;
  onChoose: () => void;
  onBack: () => void;
}

export default function DetailScreen({ bouquet, onChoose, onBack }: Props) {
  const { lang, t } = useLang();

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-dvh max-w-md flex-col pb-28"
    >
      <ScreenHeader label={t.detail.backLabel} onBack={onBack} />
      <RevealImage
        baseSrc={bouquet.image}
        detailSrc={bouquet.detailImage}
        alt={bouquet.name[lang]}
        hintText={t.detail.revealHint}
        className="aspect-[4/5] w-full"
      />
      <div className="flex flex-1 flex-col gap-4 px-5 pt-5">
        <div>
          <h1 className="font-display text-2xl text-charcoal">{bouquet.name[lang]}</h1>
          <p className="mt-1 text-sm leading-relaxed text-ink/70">{bouquet.description[lang]}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-wide text-sage">{t.detail.flowersTitle}</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {bouquet.flowers[lang].map((f) => (
              <li key={f} className="rounded-full bg-blush/60 px-3 py-1 text-xs text-ink/80">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 mx-auto flex max-w-md items-center justify-between gap-3 bg-cream/95 px-5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur">
        <span className="font-display text-xl text-terracotta">{bouquet.price} ₴</span>
        <button
          onClick={onChoose}
          className="rounded-full bg-terracotta px-6 py-3 text-sm font-semibold text-cream shadow-soft transition-transform active:scale-95"
        >
          {t.detail.chooseButton}
        </button>
      </div>
    </motion.div>
  );
}
