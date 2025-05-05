// app/components/sidenav-wrapper.tsx
'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import TopicLinks from '@/app/ui/topic/topics-links';
import Search from '../search';
import { TopicWithPostsCount } from '@/app/lib/definitions';
import { useSide } from '../side-context';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useDebouncedCallback } from 'use-debounce';
import { usePathname, useRouter } from 'next/navigation';
import TopicsListSkeleton from './topics-list-skeleton';
import { Button } from '@heroui/react';

export default function TopicListWrapper({
  initialQuery = '',
}: {
  initialQuery?: string;
}) {
  const { replace } = useRouter();
  // const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [topics, setTopics] = useState<TopicWithPostsCount[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen } = useSide();
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/topics?query=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch topics');
        }

        const data = await response.json();

        setTopics(data);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many requests while typing
    const timer = setTimeout(() => {
      fetchTopics();
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isOpen && !loading && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen, loading]);
  const handleSearch = useDebouncedCallback((term: string) => {
    setQuery(term);
    const params = new URLSearchParams();
    if (term) {
      params.set('query', term);
    }
    if (!term) {
      params.delete('query');
    }
    replace(`/topics?${params.toString()}`);
  }, 300);

  // const handleSearch = (searchQuery: string) => {
  //   setQuery(searchQuery);
  // };
  if (!isOpen) return null;
  if (loading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Seacrh Topics ..."
            onChange={(e) => handleSearch(e.target.value)}
            // defaultValue={initialQuery}
            value={query}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* <Search placeholder="Search Topics" onSearch={handleSearch} /> */}

        <TopicsListSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Seacrh Topics ..."
            onChange={(e) => handleSearch(e.target.value)}
            // defaultValue={initialQuery}
            value={query}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* <Search placeholder="Search Topics" onSearch={handleSearch} /> */}

        <div className="text-red-500 p-4 flex flex-col gap-2">
          <div>⚠️ {error}</div>
          <Button
            isLoading={loading}
            disabled={loading}
            onPress={() => {
              setError(null);
              setLoading(true);
              // This will trigger the useEffect to fetch again
              setQuery((prev) => prev + ' '); // Add a space to ensure the effect triggers
              setTimeout(() => setQuery((prev) => prev.trim()), 10); // Remove the space after
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (topics.length === 0) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative flex flex-1 flex-shrink-0">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <input
            ref={inputRef}
            className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Seacrh Topics ..."
            onChange={(e) => handleSearch(e.target.value)}
            // defaultValue={initialQuery}
            value={query}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
        </div>
        {/* <Search placeholder="Search Topics" onSearch={handleSearch} /> */}

        <p>There are no topics matching your query!</p>
      </div>
    );
  }

  return (
    <>
      {/* <Search placeholder="Search Topics" onSearch={handleSearch} /> */}
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          ref={inputRef}
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Seacrh Topics ..."
          onChange={(e) => handleSearch(e.target.value)}
          // defaultValue={initialQuery}
          value={query}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <TopicLinks topics={topics} />
    </>
  );
}
