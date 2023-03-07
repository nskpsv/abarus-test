import styles from './pagination.module.css';
import { useAppSelector } from '../../hooks/store';
import {
  selectAllPosts,
  selectCurrentPage,
  selectPostsPerPage,
} from '../../store/posts-slice/posts-slice';

const Pagination = () => {
  const quantity = useAppSelector(selectPostsPerPage);
  const total = useAppSelector(selectAllPosts).length;
  const currentPage = useAppSelector(selectCurrentPage);
  const pages: number[] = [];
  let page = 1;

  while (page <= Math.ceil(total / quantity)) {
    pages.push(page++);
  }

  return (
    <div className={styles.pagination}>
      <span className={styles.button}>Назад</span>
      <div className={styles.pages}>
        {pages.map((page) => (
          <span
            className={`${styles.page} ${currentPage === page ? styles.activePage : null}`}
            key={page}
          >
            {page}
          </span>
        ))}
      </div>
      <span className={styles.button}>Далее</span>
    </div>
  );
};

export { Pagination };
