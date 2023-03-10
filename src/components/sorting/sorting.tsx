import styles from './sorting.module.css';
import { SortingType, ISortingProps } from './sorting.types';

const Sorting: React.FC<ISortingProps> = ({ title, filter, onClick, type, isActive }) => {
  const handleClick = () => {
    const toggleType = (type: SortingType): SortingType =>
      type === 'ascending' ? 'descending' : 'ascending';

    const typeArg: SortingType = isActive ? toggleType(type) : 'ascending';

    onClick(filter, typeArg);
  };

  return (
    <div className={styles.sorting} onClick={handleClick}>
      <span className={styles.title}>{title}</span>
      {isActive ? (
        <div className={styles.indicator}>
          <div className={`${styles.pointer} ${type === 'descending' && styles.pointerDown}`}></div>
        </div>
      ) : (
        <div className={styles.indicatorHidden}></div>
      )}
    </div>
  );
};

export { Sorting };
