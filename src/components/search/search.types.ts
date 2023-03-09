interface ISearchProps {
  initValue: string;
  throttle?: number;
  onChange: (value: string) => void;
}

export type { ISearchProps };
