import React from "react";
import { Link } from "gatsby";

import slugify from "../util/slugify";

const Pagination = ({ currentPage, totalPages, tag }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const prevPage =
    currentPage - 1 === 1
      ? `/category/${slugify(tag)}`
      : `/category/${slugify(tag)}/${currentPage - 1}`;
  const nextPage = `/category/${slugify(tag)}/${currentPage + 1}`;

  return (
    <div style={{ marginBottom: "15px" }}>
      {isFirst ? (
        <button className="btn-page" disabled>
          Prev
        </button>
      ) : (
        <Link to={prevPage}>
          <button className="btn-page">Prev</button>
        </Link>
      )}
      {Array.from({ length: totalPages }).map((_, index) => (
        <Link
          key={index}
          to={
            index === 0
              ? `/category/${slugify(tag)}`
              : `/category/${slugify(tag)}/${index + 1}`
          }
        >
          <button className="btn-page" disabled={currentPage === index + 1}>
            {index + 1}
          </button>
        </Link>
      ))}
      {isLast ? (
        <button className="btn-page" disabled>
          Next
        </button>
      ) : (
        <Link to={nextPage}>
          <button className="btn-page">Next</button>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
