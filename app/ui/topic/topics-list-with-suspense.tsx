import { Suspense } from 'react';
import TopicsListSkeleton from './topics-list-skeleton';
import TopicListWrapper from './topics-list-wrapper';
import { SideProvider } from '../side-context';
import ShowTopicsButton from './show-topics-button';
import ControlViewTopics from './control-view-topics';

export function TopicsListWithSuspense({ query }: { query: string }) {
  return (
    <Suspense fallback={<TopicsListSkeleton />}>
      <SideProvider>
        <ShowTopicsButton />
        {/* <ControlViewTopics> */}
        <TopicListWrapper query={query} />
        {/* </ControlViewTopics> */}
      </SideProvider>
    </Suspense>
  );
}
