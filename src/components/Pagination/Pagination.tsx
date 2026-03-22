import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Paginate = (ReactPaginate as any).default || ReactPaginate;

interface PageChangeEvent {
  selected: number;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <>
      <Paginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        onPageChange={({ selected }: PageChangeEvent) =>
          onPageChange(selected + 1)
        }
        forcePage={currentPage - 1}
        containerClassName={css.pagination}
        activeClassName={css.active}
        nextLabel="→"
        previousLabel="←"
      />
    </>
  );
}

export default Pagination;
