import { IPost } from '../../store/posts-slice/posts-slice.types';
import { SortingType } from '../sorting/sorting.types';

interface IPostsTableColumn {
  name: string;
  filter: string;
}

interface IPostsTableProps {
  posts: IPost[];
  pagination: {
    currentPage: number;
    postsPerPage: number;
    onPageChange: (nextPage: number) => void;
  };
  sorting: {
    filter: string | null;
    type: SortingType;
    onSorting: (filter: string, type: SortingType) => void;
  };
}

export type { IPostsTableProps, IPostsTableColumn };
