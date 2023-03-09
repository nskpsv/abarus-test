declare type SortingType = 'ascending' | 'descending';

interface ISortingProps {
  title: string;
  filter: string;
  type: SortingType;
  isActive: boolean;
  onClick: (filter: string, type: SortingType) => void;
}

export type { ISortingProps, SortingType };
