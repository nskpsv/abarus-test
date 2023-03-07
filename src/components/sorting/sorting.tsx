import styles from './sorting.module.css';
import { useSearchParams } from 'react-router-dom';
import { SearchProps } from './sorting.types';
import { useEffect, useState } from 'react';

const Sorting: React.FC<SearchProps> = ({ title, filterName }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [descending, setDescending] = useState(searchParams.get('sort') === filterName);

  const clickHandler = () => {
    if (descending) {
      setSearchParams((params) => {
        params.delete('sort');
        setDescending((prev) => !prev);

        return params;
      });
    } else {
      setSearchParams((params) => {
        params.set('sort', filterName);
        setDescending((prev) => !prev);

        return params;
      });
    }
  };

  useEffect(() => {
    if (searchParams.get('sort') !== filterName) {
      setDescending(false);
    }
  }, [searchParams]);

  return (
    <div className={styles.sorting} onClick={clickHandler}>
      <span className={styles.title}>{title}</span>
      <div
        className={`${styles.indicator} ${descending ? styles.indicatorDown : styles.indicatorUp}`}
      ></div>
    </div>
  );
};

export { Sorting };
