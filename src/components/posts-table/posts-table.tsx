import { useAppSelector } from '../../store/hooks';
import { selectCurrentPostsList } from '../../store/posts-slice/posts-slice';
import { Pagination } from '../pagination/pagination';

const PostsTable = () => {
  const posts = useAppSelector(selectCurrentPostsList);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Заголовок</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
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
