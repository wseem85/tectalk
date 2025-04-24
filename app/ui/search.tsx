'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
export default function Search({
  placeholder,
  onSearch,
}: {
  placeholder: string;
  onSearch: (query: string) => void;
}) {
  const searchParams = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState(
    searchParams.get('query')?.toString()
  );

  const { replace } = useRouter();

  const handleSearch =
    //  useDebouncedCallback(
    (term: string) => {
      onSearch(term);
      const params = new URLSearchParams();
      if (term) {
        params.set('query', term);
      }
      if (!term) {
        params.delete('query');
      }
      replace(`/topics?${params.toString()}`);
    };
  // , 300);
  // useEffect(
  //   function () {
  //     setCurrentQuery(searchParams.get('query')?.toString());
  //   },
  //   [searchParams]
  // );
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          setCurrentQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        value={currentQuery || ''}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
