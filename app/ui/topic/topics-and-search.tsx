import TopicListWrapper from './topics-list-wrapper';

import ShowTopicsButton from './show-topics-button';

export function Topics({ query }: { query: string }) {
  return (
    <>
      <TopicListWrapper initialQuery={query} />
    </>
  );
}
