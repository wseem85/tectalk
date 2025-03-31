import { fetchFilteredTopics, fetchTopics } from '@/app/lib/data';

import { TopicsListWithSuspense } from '@/app/ui/topic/topics-list-wrapper';
import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';
import Search from '@/app/ui/search';
import { PowerIcon } from '@heroicons/react/24/solid';
import { Button } from '@/app/ui/button';
import { auth } from '@/auth';

export default async function SidePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const session = await auth();
  const query = (await searchParams).query || '';
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex flex-col gap-6">
        <div>Welcome back {session?.user?.name}</div>
        <Link href="/topics/new">
          <Button>Create New Topic</Button>
        </Link>
        <Search placeholder="Search Topics" />
        <TopicsListWithSuspense query={query} />
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
