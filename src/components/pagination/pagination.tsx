import styles from './pagination.module.css';
import { useAppSelector } from '../../store/hooks';
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
    <div>
      <span>Назад</span>
      {pages.map((page) => (
        <span className={`${styles.page} ${currentPage === page ? styles.pageActive : null}`} key={page}>{page}</span>
      ))}
      <span>Далее</span>
    </div>
  );
};

export { Pagination };
