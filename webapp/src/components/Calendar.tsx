import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../i18n/LangContext";

interface Props {
  value: Date | null;
  onChange: (d: Date) => void;
  minDate?: Date;
}

function startOfDay(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

function addMonths(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}

function sameDay(a: Date, b: Date): boolean {
  return a.toDateString() === b.toDateString();
}

function buildGrid(monthDate: Date): (Date | null)[] {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array.from({ length: startOffset }, () => null);
  for (let day = 1; day <= daysInMonth; day++) cells.push(new Date(year, month, day));
  return cells;
}

export default function Calendar({ value, onChange, minDate }: Props) {
  const { t } = useLang();
  const { weekdays, months } = t.calendar;
  const today = startOfDay(new Date());
  const min = minDate ? startOfDay(minDate) : startOfDay(new Date(today.getTime() + 86_400_000));
  const [cursor, setCursor] = useState(new Date(min.getFullYear(), min.getMonth(), 1));
  const [direction, setDirection] = useState(1);

  const cells = useMemo(() => buildGrid(cursor), [cursor]);
  const minMonth = new Date(min.getFullYear(), min.getMonth(), 1);
  const maxMonth = addMonths(min, 2);

  function go(delta: number) {
    const next = addMonths(cursor, delta);
    if (next < minMonth || next > maxMonth) return;
    setDirection(delta);
    setCursor(next);
  }

  return (
    <div className="rounded-xl2 bg-white/70 p-4 shadow-soft">
      <div className="flex items-center justify-between">
        <button
          onClick={() => go(-1)}
          aria-label={t.calendar.prevMonth}
          className="h-10 w-10 rounded-full text-ink/60 transition hover:bg-blush/50"
        >
          ‹
        </button>
        <span className="font-display text-sm text-charcoal">
          {months[cursor.getMonth()]} {cursor.getFullYear()}
        </span>
        <button
          onClick={() => go(1)}
          aria-label={t.calendar.nextMonth}
          className="h-10 w-10 rounded-full text-ink/60 transition hover:bg-blush/50"
        >
          ›
        </button>
      </div>
      <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-[11px] uppercase text-ink/40">
        {weekdays.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </div>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={cursor.toISOString()}
          custom={direction}
          initial={{ x: direction * 24, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -direction * 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-7 gap-y-1"
        >
          {cells.map((date, i) => {
            if (!date) return <span key={`empty-${i}`} />;
            const disabled = date < min;
            const isSelected = value !== null && sameDay(value, date);
            return (
              <button
                key={date.toISOString()}
                disabled={disabled}
                onClick={() => onChange(date)}
                className="relative flex h-10 items-center justify-center text-sm disabled:cursor-not-allowed"
              >
                {isSelected && (
                  <motion.span
                    layoutId="calendar-selected"
                    className="absolute inset-1 rounded-full bg-terracotta"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span
                  className={`relative z-10 ${
                    disabled ? "text-ink/25" : isSelected ? "text-cream" : "text-ink/80"
                  }`}
                >
                  {date.getDate()}
                </span>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
