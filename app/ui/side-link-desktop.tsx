'use client';
import Link from 'next/link';
import { TopicWithPostsCount } from '../lib/definitions';
import { usePathname } from 'next/navigation';

export default function SideLinkDesktop({
  href,
  topic,
}: {
  href: string;
  topic: TopicWithPostsCount;
}) {
  const pathname = usePathname();

  return (
    <Link
      className={`${
        pathname.includes(href) ? 'bg-sky-100' : ''
      } flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
      key={topic.id}
      href={href}
    >
      <p className="font-semibold capitalize tracking-wide">{topic.title}</p>
      <p className="italic"> ( {topic.posts_count} posts)</p>
    </Link>
  );
}
