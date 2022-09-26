import React from "react";
import styles from "./Pagination.module.css";

const Pagination = (props) => {
  const total = props.total;
  const limit = 7;
  const page = props.page;
  const setPage = props.setPage;
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <nav className={styles.nav}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </button>
          ))}
        <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </button>
      </nav>
    </>
  );
};

export default Pagination;
