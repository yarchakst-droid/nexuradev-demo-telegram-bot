import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { Bouquet } from "../types";

interface Props {
  bouquet: Bouquet;
  index: number;
  onSelect: (b: Bouquet) => void;
}

export default function BouquetCard({ bouquet, index, onSelect }: Props) {
  const { lang, t } = useLang();

  return (
    <motion.button
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(bouquet)}
      className="group flex flex-col overflow-hidden rounded-xl2 bg-white/70 text-left shadow-soft ring-1 ring-charcoal/5"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={bouquet.image}
          alt={bouquet.name[lang]}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-charcoal/30 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col gap-1 px-4 py-3">
        <h3 className="font-display text-lg leading-snug text-charcoal">{bouquet.name[lang]}</h3>
        <p className="line-clamp-2 text-sm text-ink/70">{bouquet.description[lang]}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-base text-terracotta">{bouquet.price} ₴</span>
          <span className="text-xs uppercase tracking-wide text-sage">{t.catalog.detailsCta}</span>
        </div>
      </div>
    </motion.button>
  );
}
