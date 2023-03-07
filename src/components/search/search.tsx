import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setSearch } from '../../store/posts-slice/posts-slice'; 

const Search = () => {
  const [value, setValue] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(value));
    }, 200);

    return () => clearTimeout(handler);
  });

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};
export { Search };
