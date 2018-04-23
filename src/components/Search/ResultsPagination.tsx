import * as React from "react";
import { IPagination } from "./SearchResults/SearchResults";

import "./ResultsPagination.css";

interface IPaginationProps {
  pagination: IPagination;
  prevPage: () => void;
  nextPage: () => void;
}

export function ResultsPagination(props: IPaginationProps) {
  const { pagination, nextPage, prevPage } = props;
  return (
    <div className="pagination">
      {pagination.prevPage > 0 ? (
        <button
          type="button"
          className="pagination__back"
          onClick={prevPage}
          title={`Go to page ${pagination.prevPage}`}
        >{`← Page ${pagination.prevPage}`}</button>
      ) : (
        <div className="pagination__back pagination__back--placeholder" />
      )}
      {pagination.maxPages > 1 && (
        <p className="pagination__current-page">
          Page {pagination.currentPage} of {pagination.maxPages}
        </p>
      )}
      {pagination.nextPage <= pagination.maxPages ? (
        <button
          type="button"
          className="pagination__forwards"
          onClick={nextPage}
          title={`Go to page ${pagination.nextPage}`}
        >{`Page ${pagination.nextPage} →`}</button>
      ) : (
        <div className="pagination__forwards pagination__forwards--placeholder" />
      )}
    </div>
  );
}
