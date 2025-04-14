// components/side-link.tsx
'use client';

import Link from 'next/link';
import { useSide } from './side-context';
import { usePathname } from 'next/navigation';

export function SideLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const { closeSide } = useSide();
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={closeSide}
      className={` flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
        pathname.includes(href) ? 'bg-sky-100 ' : 'bg-gray-50 '
      }`}
    >
      {children}
    </Link>
  );
}
