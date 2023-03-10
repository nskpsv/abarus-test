import styles from './posts-table.module.css';
import { Sorting } from '../sorting/sorting';
import { IPostsTableColumn, IPostsTableProps } from './posts-table.types';
import { Pagination } from '../pagination/pagination';
import { getSlice } from './posts-table.service';

const columns: IPostsTableColumn[] = [
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

const PostsTable: React.FC<IPostsTableProps> = ({ posts, pagination, sorting }) => {
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
                  <Sorting
                    title={name}
                    filter={filter}
                    onClick={sorting.onSorting}
                    type={filter === sorting.filter ? sorting.type : 'ascending'}
                    isActive={filter === sorting.filter}
                  />
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {getSlice(posts, pagination.currentPage, pagination.postsPerPage).map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {(Math.ceil(posts.length / pagination.postsPerPage) > 1) &&
      <Pagination
        currentPage={pagination.currentPage}
        total={Math.ceil(posts.length / pagination.postsPerPage)}
        onClick={pagination.onPageChange}
      />
}
    </div>
  );
};

export { PostsTable };
