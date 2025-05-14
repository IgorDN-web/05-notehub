import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

const Pagination = () => {
  const pageCount = 5; // динамически — из data.totalPages

  return (
    <ReactPaginate
      className={css.pagination}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      onPageChange={(event) => console.log(event.selected + 1)}
      renderOnZeroPageCount={null}
    />
  );
};

export default Pagination;