import styles from './pagination.module.css';
import { IPaginationProps } from './pagination.types';

const Pagination: React.FC<IPaginationProps> = ({ onClick, total, currentPage = 1 }) => {
  const pages: number[] = [];
  let page = 1;

  while (page <= total) {
    pages.push(page++);
  }

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        onClick={() => onClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Назад
      </button>
      <div className={styles.pages}>
        {pages.map((page) => (
          <span
            className={`${styles.page} ${currentPage === page ? styles.activePage : null}`}
            onClick={() => onClick(page)}
            key={page}
          >
            {page}
          </span>
        ))}
      </div>
      <button
        className={styles.button}
        onClick={() => onClick(currentPage + 1)}
        disabled={currentPage === total}
      >
        Далее
      </button>
    </div>
  );
};

export { Pagination };
