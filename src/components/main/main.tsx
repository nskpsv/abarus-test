import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Search } from '../search/search';

const Main = () => {
  const [search, setSearch] = useState('');

  return (
    <div>
      <div>
        <Search />
      </div>
      <Outlet />
    </div>
  );
};

export { Main };
