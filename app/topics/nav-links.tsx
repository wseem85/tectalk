// Map of links to display in the side navigation.

import Link from 'next/link';

// Depending on the size of the application, this would be stored in a database.
const topics = [
  { name: 'Javascript', href: '/topics/javascript' },
  {
    name: 'HTML',
    href: '/topics/html',
  },
  { name: 'CSS', href: '/topics/css' },
];

export default function NavLinks() {
  return (
    <>
      {topics.map((topic) => {
        return (
          <Link
            key={topic.name}
            href={topic.href}
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <p className="hidden md:block">{topic.name}</p>
          </Link>
        );
      })}
    </>
  );
}
