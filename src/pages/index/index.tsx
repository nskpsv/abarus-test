import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostsTable } from '../../components/posts-table/posts-table';
import { IPostsTableProps } from '../../components/posts-table/posts-table.types';
import { Search } from '../../components/search/search';
import { SortingType } from '../../components/sorting/sorting.types';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { selectPostsState, setPreparedPosts } from '../../store/posts-slice/posts-slice';
import { getPosts } from '../../store/posts-slice/posts-thunk';
import { getSearchParams } from './index.service';
import { IFiltersSet } from './index.types';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const dispatch = useAppDispatch();
  const { error, isFetching, posts, preparedPosts, postsPerPage } =
    useAppSelector(selectPostsState);
  const [filters, setFilters] = useState<IFiltersSet>(
    getSearchParams(Array.from(searchParams.entries())),
  );

  const handleChangePage = (page: number) => {
    setSearchParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };

  const handleSorting = (filter: string, type: SortingType) => {
    if (filter === 'id' && type === 'ascending') {
      setSearchParams((params) => {
        params.delete('sort');
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.set('sort', `${filter}_${type}`);
        return params;
      });
    }
  };

  const handleSearch = (value: string) => {
    if (value !== '') {
      setSearchParams((params) => {
        params.set('search', value);
        params.set('page', '1');
        return params;
      });
    } else {
      setSearchParams((params) => {
        params.delete('search');
        params.set('page', '1');
        return params;
      });
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    dispatch(setPreparedPosts(filters));
  }, [filters, posts]);

  useEffect(() => {    
    setFilters(getSearchParams(Array.from(searchParams.entries())));
  }, [searchParams]);

  if (isFetching) {
    return <h1>Loading...</h1>;
  }

  if (error !== '') {
    return <h1>Не удалось загрузить посты.</h1>;
  }

  const tableProps: IPostsTableProps = {
    posts: preparedPosts,
    pagination: {
      currentPage: filters.page,
      postsPerPage,
      onPageChange: handleChangePage,
    },
    sorting: {
      filter: filters.sort?.filter === undefined ? 'id' : filters.sort.filter,
      type: filters.sort?.type === undefined ? 'ascending' : filters.sort.type,
      onSorting: handleSorting,
    },
  };

  return (
    <div>
      <div>
        <Search onChange={handleSearch} initValue={filters.search} />
      </div>
      {posts === undefined ? <h1>Нет постов</h1> : <PostsTable {...tableProps} />}
    </div>
  );
};

export { Index };
