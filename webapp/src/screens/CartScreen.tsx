import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";
import type { Bouquet, OrderPayload } from "../types";
import ScreenHeader from "../components/ScreenHeader";
import Calendar from "../components/Calendar";

interface Props {
  bouquet: Bouquet;
  onConfirm: (payload: OrderPayload) => void;
  onBack: () => void;
}

export default function CartScreen({ bouquet, onConfirm, onBack }: Props) {
  const { lang, t } = useLang();
  const [date, setDate] = useState<Date | null>(null);
  const [note, setNote] = useState("");

  function handleConfirm() {
    if (!date) return;
    onConfirm({
      bouquetId: bouquet.id,
      bouquetName: bouquet.name[lang],
      price: bouquet.price,
      deliveryDate: date.toISOString().slice(0, 10),
      note: note.trim() || undefined,
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 pb-28"
    >
      <ScreenHeader label={t.cart.headerLabel} onBack={onBack} />
      <div className="flex items-center gap-3 px-5">
        <img src={bouquet.image} alt={bouquet.name[lang]} className="h-16 w-16 rounded-xl2 object-cover shadow-soft" />
        <div>
          <p className="font-display text-base text-charcoal">{bouquet.name[lang]}</p>
          <p className="text-sm text-terracotta">{bouquet.price} ₴</p>
        </div>
      </div>

      <div className="px-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-sage">{t.cart.deliveryDateTitle}</h2>
        <Calendar value={date} onChange={setDate} />
      </div>

      <div className="px-5">
        <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-sage">{t.cart.noteTitle}</h2>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={t.cart.notePlaceholder}
          rows={3}
          className="w-full resize-none rounded-xl2 bg-white/70 p-3 text-sm text-ink shadow-soft outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-terracotta/40"
        />
      </div>

      <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md bg-cream/95 px-5 py-4 backdrop-blur">
        <button
          onClick={handleConfirm}
          disabled={!date}
          className="w-full rounded-full bg-terracotta py-3 text-sm font-semibold text-cream shadow-soft transition-transform enabled:active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {date ? t.cart.confirmButton : t.cart.pickDateButton}
        </button>
      </div>
    </motion.div>
  );
}
