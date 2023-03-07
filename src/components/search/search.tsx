import styles from './search.module.css';
import icon from './assets/loupe.svg';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from '../../hooks/debounce';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState(searchParams.get('search') ?? '');
  const debounced = useDebounce(value);

  useEffect(() => {
    if (debounced !== '') {
      console.log(debounced);

      setSearchParams((prev) => {
        prev.set('search', debounced);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.delete('search');
        return prev;
      });
    }
  }, [debounced]);

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск"
      />
      <div className={styles.searchButton}>
        <img className={styles.searchButtonIcon} src={icon} />
      </div>
    </div>
  );
};
export { Search };
