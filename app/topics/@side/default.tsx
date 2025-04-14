// import { TopicListWith } from '@/app/ui/topic/topics-list-wrapper';
import { TopicsListWithSuspense } from '@/app/ui/topic/topics-list-with-suspense';

import Link from 'next/link';
import Search from '@/app/ui/search';

import { Button } from '@/app/ui/button';

import SignOutForm from '@/app/ui/signout-form';
import UserInfo from '@/app/ui/user-info';
import TecTalkLogo from '@/app/ui/tectalk-logo';
import SidePageWrapper from '@/app/ui/side-page-wrapper';
import WindowSizeDetector from '@/app/ui/window-size-detector';

export default async function SidePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query || '';
  return (
    <div className="flex h-auto md:h-sceeen space-y-6 flex-col px-3 py-4 md:px-2 ">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-pink-600 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          <TecTalkLogo />
        </div>
      </Link>
      <UserInfo />
      <Link href="/topics/new">
        <Button>Create New Topic</Button>
      </Link>
      <WindowSizeDetector
        children={null}
        mobileComponentToShow={
          <>
            <div className="flex flex-col gap-6 overflow-y-auto">
              {/* <Search placeholder="Search Topics" /> */}
              <TopicsListWithSuspense query={query} />
            </div>
          </>
        }
        desktopComponentToShow={
          <>
            <div className="flex flex-col gap-6 overflow-y-auto">
              {/* <Search placeholder="Search Topics" /> */}
              <TopicsListWithSuspense query={query} />
            </div>
          </>
        }
      ></WindowSizeDetector>

      <SignOutForm />
    </div>
  );
}
