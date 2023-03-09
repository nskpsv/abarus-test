import styles from './search.module.css';
import icon from './assets/loupe.svg';
import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/debounce';
import { ISearchProps } from './search.types';

const Search: React.FC<ISearchProps> = ({ onChange, initValue = '', throttle = 300 }) => {
  const [input, setInput] = useState(initValue);
  const debounced = useDebounce(input, throttle);

  useEffect(() => {
    onChange(debounced);
  }, [debounced]);

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Поиск"
      />
      <div className={styles.searchButton}>
        <img className={styles.searchButtonIcon} src={icon} />
      </div>
    </div>
  );
};
export { Search };
