import styles from './sorting.module.css';
import { SortingType, ISortingProps } from './sorting.types';

const Sorting: React.FC<ISortingProps> = ({ title, filter, onClick, type, isActive }) => {
  const clickHandler = () => {
    const toggleType = (type: SortingType): SortingType =>
      type === 'ascending' ? 'descending' : 'ascending';

    const typeArg: SortingType = isActive ? toggleType(type) : 'ascending';

    onClick(filter, typeArg);
  };

  return isActive ? (
    <div className={styles.sorting} onClick={clickHandler}>
      <span className={styles.title}>{title}</span>
      <div className={styles.indicator}>
        <div className={`${styles.pointer} ${type === 'descending' && styles.pointerDown}`}></div>
      </div>
    </div>
  ) : (
    <div className={styles.sorting} onClick={clickHandler}>
      <span className={styles.title}>{title}</span>
      <div className={styles.indicatorHidden}></div>
    </div>
  );
};

export { Sorting };
