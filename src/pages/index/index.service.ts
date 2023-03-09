import { SortingType } from '../../components/sorting/sorting.types';
import { IPost } from '../../store/posts-slice/posts-slice.types';
import { IFiltersSet } from './index.types';

const search = (value: string, list: IPost[]) =>
  list.filter(
    (post) => post.id.toString().match(value) ?? post.title.match(value) ?? post.body.match(value),
  );

const sortList = (filter: string | null, type: 'ascending' | 'descending', list: IPost[]) => {
  const temp = [...list];

  switch (filter) {
    case 'id': {
      return type === 'ascending'
        ? [...temp.sort((a, b) => a.id - b.id)]
        : [...temp.sort((a, b) => b.id - a.id)];
    }
    case 'title': {
      return type === 'ascending'
        ? [
            ...temp.sort((a, b) => {
              if (a.title < b.title) return -1;
              if (a.title > b.title) return 1;
              return 0;
            }),
          ]
        : [
            ...temp.sort((a, b) => {
              if (a.title > b.title) return -1;
              if (a.title < b.title) return 1;
              return 0;
            }),
          ];
    }
    case 'description': {
      return type === 'ascending'
        ? [
            ...temp.sort((a, b) => {
              if (a.body < b.body) return -1;
              if (a.body > b.body) return 1;
              return 0;
            }),
          ]
        : [
            ...temp.sort((a, b) => {
              if (a.body > b.body) return -1;
              if (a.body < b.body) return 1;
              return 0;
            }),
          ];
    }
    default: {
      return [...temp.sort((a, b) => a.id - b.id)];
    }
  }
};

const defaultSearchParams = {
    search: '',
    page: 1,
    sort: {
      filter: 'id',
      type: 'ascending' as SortingType,
    },
  }

const getSearchParams = (params: string[][]) =>
  params.reduce((res, [param, value]) => {
    switch (param) {
      case 'page': {
        res = { ...res, [param]: Number(value) };
        return res;
      }
      case 'sort': {
        res = {
          ...res,
          [param]: {
            filter: value.split('_')[0],
            type: value.split('_')[1] as SortingType,
          },
        };
        return res;
      }
      case 'search': {
        res = { ...res, [param]: value };
        return res;
      }
    }

    return res;
  }, {...defaultSearchParams}) as IFiltersSet;

export { sortList, getSearchParams, search };
