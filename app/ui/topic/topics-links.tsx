// Map of links to display in the side navigation.

import Link from 'next/link';
import { Topic } from '../../lib/definitions';

// Depending on the size of the application, this would be stored in a database.

export default async function TopicLinks({
  topics,
}: {
  topics: Topic[] | undefined;
}) {
  // return null;
  return (
    <>
      {topics?.map((topic) => {
        const encodedTitle = encodeURIComponent(topic.title.toLowerCase());

        const href = `/topics/${encodedTitle}`;
        return (
          <Link
            key={topic.id}
            href={href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p className="hidden md:block">{encodedTitle}</p>
          </Link>
        );
      })}
    </>
  );
}
