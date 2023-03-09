import { IPost } from '../../store/posts-slice/posts-slice.types';

const getSlice = (list: IPost[], page: number, quantity: number) =>
  list.slice((page - 1) * 10, quantity * page);

export { getSlice };
