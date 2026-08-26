import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { Bouquet, Occasion } from "../types";
import BouquetCard from "../components/BouquetCard";
import FilterPills from "../components/FilterPills";
import BrandMark from "../components/BrandMark";
import LanguageSwitcher from "../components/LanguageSwitcher";

interface Props {
  bouquets: Bouquet[];
  onSelect: (b: Bouquet) => void;
}

export default function CatalogScreen({ bouquets, onSelect }: Props) {
  const { t } = useLang();
  const [filter, setFilter] = useState<Occasion | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? bouquets : bouquets.filter((b) => b.occasion.includes(filter))),
    [bouquets, filter]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pb-10 pt-6"
    >
      <div className="flex items-center justify-between">
        <BrandMark />
        <LanguageSwitcher />
      </div>
      <div>
        <h1 className="font-display text-2xl text-charcoal">{t.catalog.title}</h1>
        <p className="mt-1 text-sm text-ink/60">{t.catalog.subtitle}</p>
      </div>
      <FilterPills active={filter} onChange={setFilter} />
      <div className="grid grid-cols-2 gap-3">
        {filtered.map((b, i) => (
          <BouquetCard key={b.id} bouquet={b} index={i} onSelect={onSelect} />
        ))}
      </div>
      {filtered.length === 0 && <p className="py-10 text-center text-sm text-ink/50">{t.catalog.emptyFiltered}</p>}
    </motion.div>
  );
}
