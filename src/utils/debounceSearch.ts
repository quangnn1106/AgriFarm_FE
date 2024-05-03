import { debounce } from 'lodash';
import { useRef, useEffect } from 'react';

export const useDebounceSearch = (
  fetchFunc: (search: string) => Promise<void>,
  time?: number
) => {
  const debouncedSearch = useRef(
    debounce(async (value: string) => {
      // if (value.trim().length > 0) {
        await fetchFunc(value);
      // }
    }, time || 500)
  ).current;

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchTextChange = (search: string) => {
    debouncedSearch(search);
  };

  return [handleSearchTextChange];
};
