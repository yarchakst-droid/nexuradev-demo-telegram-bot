import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { OrderPayload } from "../types";
import PetalsCanvas from "../components/PetalsCanvas";

interface Props {
  order: OrderPayload;
  onDone: () => void;
  onBackToCatalog: () => void;
}

export default function ConfirmationScreen({ order, onDone, onBackToCatalog }: Props) {
  const { t, locale } = useLang();
  const [showPetals, setShowPetals] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPetals(false), 4200);
    return () => clearTimeout(timer);
  }, []);

  // order.deliveryDate is a plain YYYY-MM-DD calendar date; format in UTC so the
  // day isn't reinterpreted against the viewer's local timezone offset.
  const formattedDate = new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", timeZone: "UTC" }).format(
    new Date(order.deliveryDate)
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-6 overflow-hidden px-6 text-center"
    >
      <PetalsCanvas active={showPetals} />
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }}
        className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-terracotta text-3xl text-cream shadow-soft"
      >
        🌸
      </motion.div>
      <div className="relative z-10 space-y-2">
        <h1 className="font-display text-2xl text-charcoal">{t.confirmation.title}</h1>
        <p className="text-sm text-ink/70">{t.confirmation.body(order.bouquetName, formattedDate)}</p>
      </div>
      <div className="relative z-10 flex w-full flex-col gap-3 pt-4">
        <button
          onClick={onDone}
          className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-cream shadow-soft transition-transform active:scale-95"
        >
          {t.confirmation.doneButton}
        </button>
        <button
          onClick={onBackToCatalog}
          className="w-full rounded-full bg-white/70 py-3 text-sm font-medium text-ink/70 shadow-soft transition-transform active:scale-95"
        >
          {t.confirmation.backToCatalogButton}
        </button>
      </div>
    </motion.div>
  );
}
