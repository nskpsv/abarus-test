import styles from './pagination.module.css';

type IPaginationProps = {
  currentPage?: number;
  total: number;
  onClick: (nextPage: number) => void;
};

const Pagination: React.FC<IPaginationProps> = ({ onClick, total, currentPage = 1 }) => {  
  const pages = new Array(total).fill('');

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
        {pages.map((_, page) => (
          <span
            className={`${styles.page} ${currentPage === page + 1 ? styles.activePage : null}`}
            onClick={() => onClick(page + 1)}
            key={page}
          >
            {page + 1}
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
