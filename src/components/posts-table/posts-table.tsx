import styles from './posts-table.module.css';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { useGetPostsQuery } from '../../store/posts-slice/posts-api-slice';
import {
  selectCurrentPostsList,
  selectPostsPerPage,
  setCurrentPostsList,
  setPosts,
} from '../../store/posts-slice/posts-slice';
import { Pagination } from '../pagination/pagination';
import { Sorting } from '../sorting/sorting';

const columns: Array<{ name: string; filter: string }> = [
  {
    name: 'ID',
    filter: 'id',
  },
  {
    name: 'Заголовок',
    filter: 'title',
  },
  {
    name: 'Описание',
    filter: 'description',
  },
];

const PostsTable = () => {
  const posts = useAppSelector(selectCurrentPostsList);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isError } = useGetPostsQuery(null);
  const dispatch = useAppDispatch();
  const quantity = useAppSelector(selectPostsPerPage);

  useEffect(() => {
    if (searchParams.get('page') === null) {
      setSearchParams((prev) => {
        prev.set('page', '1');
        return prev;
      });
    }

    if (data !== undefined) {
      dispatch(setPosts(data));
      dispatch(
        setCurrentPostsList(data.slice((Number(searchParams.get('page')) - 1) * 10, quantity)),
      );
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    return <h1>Не удалось загрузить посты.</h1>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <colgroup>
          <col id={styles.col1} />
          <col id={styles.col2} />
          <col id={styles.col3} />
        </colgroup>
        <thead className={styles.tableHeader}>
          <tr>
            {columns.map(({ filter, name }) => {
              return (
                <th key={filter}>
                  <Sorting title={name} filterName={filter} />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export { PostsTable };
