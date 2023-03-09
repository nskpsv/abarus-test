interface IPaginationProps {
  currentPage?: number;
  total: number;
  onClick: (nextPage: number) => void;
}

export type { IPaginationProps };
