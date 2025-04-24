'use client';
import { TopicWithPostsCount } from '../../lib/definitions';
import { SideLink } from '../side-link';
import WindowSizeDetector from '../window-size-detector';

import SideLinkDesktop from '../side-link-desktop';
import Search from '../search';

export default function TopicLinks({
  topics,
}: {
  topics: TopicWithPostsCount[] | undefined;
}) {
  return (
    <WindowSizeDetector
      mobileComponentToShow={topics?.map((topic) => {
        const encodedTitle = encodeURIComponent(topic.title.toLowerCase());

        const href = `/topics/${encodedTitle}`;
        return (
          <SideLink key={topic.id} href={href}>
            <p className="font-semibold capitalize tracking-wide">
              {topic.title}
            </p>
            <p className="italic"> ( {topic.posts_count} posts)</p>
          </SideLink>
        );
      })}
      desktopComponentToShow={topics?.map((topic) => {
        const encodedTitle = encodeURIComponent(topic.title.toLowerCase());

        const href = `/topics/${encodedTitle}`;
        return <SideLinkDesktop key={topic.id} topic={topic} href={href} />;
      })}
    ></WindowSizeDetector>
  );
}
