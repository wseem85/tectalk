// app/components/sidenav-wrapper.tsx
import { fetchFilteredTopics, fetchTopics } from '@/app/lib/data';

import { Suspense } from 'react';
import TopicsListSkeleton from './topics-list-skeleton';
import { Topic } from '@/app/lib/definitions';
import TopicLinks from '@/app/ui/topic/topics-links';

export default async function TopicListWrapper({ query }: { query: string }) {
  try {
    const topics = await fetchTopics(query);
    console.log(topics);
    if (topics?.length === 0) {
      return <div>There are No Topics matches your query !</div>;
    }
    return <TopicLinks topics={topics} />;
  } catch (error) {
    return (
      <div className="text-red-500 p-4">
        ⚠️ Failed to load topics. Please try again later.
      </div>
    );
  }
}

export function TopicsListWithSuspense({ query }: { query: string }) {
  return (
    <Suspense fallback={<TopicsListSkeleton />}>
      <TopicListWrapper query={query} />
    </Suspense>
  );
}
