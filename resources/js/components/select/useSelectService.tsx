import { IPaginate } from '@/interfaces/IPaginate';
import { IFilterProps } from '@/interfaces/IPaginateServiceProps';
import { useSelectOptionsStore } from '@/store/useSelectOptionsStore';
import { debounce } from '@tanstack/pacer';
import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { IOptions } from '../form/select/interfaces/IOptions';

interface ISelectService<T extends Record<string, any>> {
  useService: (data: any) => UseQueryResult<IPaginate<T>>;
  value?: string;
  label?: string;
  search?: string;
  filters?: Array<IFilterProps> | null;
  storeKey?: string;
  useCache?: boolean;
  debounceWait?: number;
}

export const useSelectService = <T extends Record<string, any>>(props: ISelectService<T>) => {
  const { useService, value = 'id', label = 'nombre', search, filters = [], storeKey, useCache, debounceWait = 400 } = props;
  const { setOptions, getOptions, hasOptions } = useSelectOptionsStore();
  const [internalSearch, setInternalSearch] = useState<string>('');
  const effectiveSearch = typeof search === 'string' ? search : internalSearch;
  const effectiveUseCache = typeof useCache === 'boolean' ? useCache : effectiveSearch.length === 0;
  const hasCachedOptions = storeKey ? hasOptions(storeKey) : false;
  const shouldFetchData = !effectiveUseCache || !hasCachedOptions;
  const { isLoading, data, refetch } = useService({
    search: effectiveSearch,
    filters,
    enabled: shouldFetchData,
  });

  const defaultValues = useMemo((): Array<IOptions> => {
    return [{ value: 0, label: 'loading' }];
  }, []);

  const processedOptions = useMemo(() => {
    if (!isLoading && data) {
      return data.data.map((item) => ({
        value: item[value],
        label: item[label],
      }));
    }
    return null;
  }, [data, isLoading, value, label]);

  useEffect(() => {
    if (processedOptions && storeKey) {
      setOptions(storeKey, processedOptions);
    }
  }, [processedOptions, storeKey, setOptions]);

  // useEffect(() => {
  //   console.log({ effectiveUseCache });
  // }, [effectiveUseCache]);

  const options: Array<IOptions> = useMemo(() => {
    if (storeKey && effectiveUseCache && hasCachedOptions) {
      return getOptions(storeKey);
    }
    if (processedOptions) {
      return processedOptions;
    }
    return defaultValues;
  }, [storeKey, effectiveUseCache, hasCachedOptions, processedOptions, defaultValues, getOptions]);

  const handleInputChange = useMemo(
    () =>
      debounce(
        (inputValue: string) => {
          setInternalSearch(inputValue);
        },
        { wait: debounceWait },
      ),
    [debounceWait],
  );

  return {
    isLoading,
    options,
    data,
    handleInputChange,
  };
};
