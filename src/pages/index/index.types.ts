import { SortingType } from "../../components/sorting/sorting.types";

interface IFiltersSet {
  page: number;
  search: string;
  sort: {
    filter: string;
    type: SortingType;
  };
}

export type { IFiltersSet };
