interface Props {
  label: string;
  onBack?: () => void;
}

export default function ScreenHeader({ label, onBack }: Props) {
  return (
    <div className="flex items-center gap-3 px-5 pb-2 pt-6">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Назад"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/70 text-charcoal shadow-soft transition-transform active:scale-90"
        >
          ←
        </button>
      )}
      <span className="text-xs font-semibold uppercase tracking-wider text-ink/50">{label}</span>
    </div>
  );
}
