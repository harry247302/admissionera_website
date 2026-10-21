export type MentorSort = "recommended" | "fee-asc" | "fee-desc" | "experience";

const SORT_OPTIONS: { value: MentorSort; label: string }[] = [
  { value: "recommended", label: "Recommendation" },
  { value: "fee-asc", label: "Fee - Low to High" },
  { value: "fee-desc", label: "Fee - High to Low" },
  { value: "experience", label: "Experience" },
];

export function MentorSortBar({
  count,
  sort,
  onSortChange,
  feeAvailable,
}: {
  count: number;
  sort: MentorSort;
  onSortChange: (sort: MentorSort) => void;
  feeAvailable: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
      <p className="text-[18px] font-extrabold text-[#211344]" aria-live="polite">
        {count} {count === 1 ? "Mentor" : "Mentors"} Found
      </p>
      <div
        role="group"
        aria-label="Sort mentors"
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] sm:flex-wrap sm:overflow-visible sm:pb-0"
      >
        <span className="hidden shrink-0 self-center text-[13px] font-medium text-[#716786] sm:inline">Sort by:</span>
        {SORT_OPTIONS.map((option) => {
          const active = option.value === sort;
          const disabled = !feeAvailable && option.value.startsWith("fee");
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={active}
              disabled={disabled}
              title={disabled ? "Fee information isn't available for mentors yet" : undefined}
              onClick={() => onSortChange(option.value)}
              className={`h-9 shrink-0 rounded-full px-4 text-[12.5px] font-semibold transition ${
                active
                  ? "bg-[linear-gradient(135deg,#F20D70_0%,#C90083_100%)] text-white shadow-[0_6px_14px_rgba(242,13,112,0.25)]"
                  : "border border-[#E7DDF7] bg-white text-[#211344] hover:border-[#F20D70]/50 hover:text-[#F20D70] disabled:cursor-not-allowed disabled:text-[#B4ABC4] disabled:hover:border-[#E7DDF7]"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
