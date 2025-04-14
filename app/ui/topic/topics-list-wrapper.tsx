// app/components/sidenav-wrapper.tsx
import { fetchTopics } from '@/app/lib/data';

import TopicLinks from '@/app/ui/topic/topics-links';
import Search from '../search';

export default async function TopicListWrapper({ query }: { query: string }) {
  try {
    const topics = await fetchTopics(query);

    if (topics?.length === 0) {
      return (
        <div className="flex flex-col gap-2">
          <Search placeholder="Search Topics" />
          <p>There are No Topics matches your query !</p>
        </div>
      );
    }
    return (
      <>
        <Search placeholder="Search Topics" />
        <TopicLinks topics={topics} />
      </>
    );
  } catch (error) {
    return (
      <div className="text-red-500 p-4">
        ⚠️ Failed to load topics. Please try again later.
      </div>
    );
  }
}
