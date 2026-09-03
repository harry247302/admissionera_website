"use client";

type PaginationProps = {
  page: number;
  pageCount: number;
  onPage: (page: number) => void;
  showing: string;
};

export function Pagination({ page, pageCount, onPage, showing }: PaginationProps) {
  if (pageCount <= 1) {
    return <p className="text-center text-sm text-[#667085]">{showing}</p>;
  }

  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm text-[#667085]">{showing}</p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        <button
          type="button"
          className="cd-page"
          disabled={page === 1}
          onClick={() => onPage(page - 1)}
        >
          Previous
        </button>
        {pages.map((item) => (
          <button
            key={item}
            type="button"
            className={`cd-page ${item === page ? "is-active" : ""}`}
            aria-current={item === page ? "page" : undefined}
            onClick={() => onPage(item)}
          >
            {item}
          </button>
        ))}
        <button
          type="button"
          className="cd-page"
          disabled={page === pageCount}
          onClick={() => onPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
