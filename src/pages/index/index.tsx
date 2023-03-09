import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PostsTable } from '../../components/posts-table/posts-table';
import { IPostsTableProps } from '../../components/posts-table/posts-table.types';
import { Search } from '../../components/search/search';
import { SortingType } from '../../components/sorting/sorting.types';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { selectPostsState, setPreparedPosts } from '../../store/posts-slice/posts-slice';
import { getPosts } from '../../store/posts-slice/posts-thunk';
import { getSearchParams, search, sortList } from './index.service';
import { IFiltersSet } from './index.types';

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: '1' });
  const dispatch = useAppDispatch();
  const { error, isFetching, posts, preparedPosts, postsPerPage } =
    useAppSelector(selectPostsState);
  const [filters, setFilters] = useState<IFiltersSet>(
    getSearchParams(Array.from(searchParams.entries())),
  );

  const changePageHandler = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
    setSearchParams((params) => {
      params.set('page', page.toString());
      return params;
    });
  };

  const sortingHandler = (filter: string, type: SortingType) => {
    if (filter === 'id' && type === 'ascending') {
      setSearchParams((params) => {
        params.delete('sort');
        return params;
      });

      setFilters((prev) => ({
        ...prev,
        sort: {
          filter,
          type,
        },
      }));
    } else {
      setSearchParams((params) => {
        params.set('sort', `${filter}_${type}`);
        return params;
      });

      setFilters((prev) => ({
        ...prev,
        sort: {
          filter,
          type,
        },
      }));
    }
  };

  const searchHandler = (value: string) => {
    if (value !== '') {
      setSearchParams((params) => {
        params.set('search', value);
        return params;
      });

      setFilters((prev) => ({
        ...prev,
        search: value,
      }));
    } else {
      setSearchParams((params) => {
        params.delete('search');
        return params;
      });

      setFilters((prev) => ({
        ...prev,
        search: value,
      }));
    }
  };

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  useEffect(() => {
    let filtredList = search(filters.search, posts);
    filtredList = sortList(filters.sort.filter, filters.sort.type, filtredList);
    dispatch(setPreparedPosts(filtredList));
  }, [filters]);

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
      onPageChange: changePageHandler,
    },
    sorting: {
      filter: filters.sort?.filter === undefined ? 'id' : filters.sort.filter,
      type: filters.sort?.type === undefined ? 'ascending' : filters.sort.type,
      onSorting: sortingHandler,
    },
  };

  return (
    <div>
      <div>
        <Search onChange={searchHandler} initValue={filters.search} />
      </div>
      {posts === undefined ? <h1>Нет постов</h1> : <PostsTable {...tableProps} />}
    </div>
  );
};

export { Index };
