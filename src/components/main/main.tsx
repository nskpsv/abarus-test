import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useGetPostsQuery } from '../../store/posts-slice/posts-api-slice';
import {
  selectCurrentPage,
  selectPostsPerPage,
  setCurrentPostsList,
  setPosts,
} from '../../store/posts-slice/posts-slice';

const Main = () => {
  const { data, isLoading } = useGetPostsQuery(null);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const quantity = useAppSelector(selectPostsPerPage);
  const currentPage = useAppSelector(selectCurrentPage);

  useEffect(() => {
    if (data !== undefined) {
      dispatch(setPosts(data));
      dispatch(setCurrentPostsList(data.slice(0, quantity)));
      navigate(`posts/${currentPage}`);
    }
  }, [data]);

  return (
    <div>
      <div>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {isLoading ? <h1>Loading...</h1> : <Outlet />}
    </div>
  );
};

export { Main };
