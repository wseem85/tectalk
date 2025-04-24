// import { TopicListWith } from '@/app/ui/topic/topics-list-wrapper';
import { Topics } from '@/app/ui/topic/topics-and-search';

import Link from 'next/link';
import Search from '@/app/ui/search';

import { Button } from '@heroui/button';

import SignOutForm from '@/app/ui/signout-form';
import UserInfo from '@/app/ui/user-info';
import TecTalkLogo from '@/app/ui/tectalk-logo';
import SidePageWrapper from '@/app/ui/side-page-wrapper';
import WindowSizeDetector from '@/app/ui/window-size-detector';
import { SideProvider } from '@/app/ui/side-context';
import ShowTopicsButton from '@/app/ui/topic/show-topics-button';

export default async function SidePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query || '';
  return (
    <div className="flex md:h-screen   flex-col  ">
      <div className="shrink-0 flex flex-col gap-1 px-3 py-4 md:px-2">
        <Link
          className="my-2 inline-block h-20 items-center justify-start rounded-md bg-secondary p-4 "
          href="/"
        >
          <TecTalkLogo />
        </Link>
        <UserInfo />
        <Link href="/topics/new">
          <Button className="mt-3" color="primary">
            Create New Topic
          </Button>
        </Link>
      </div>
      <SideProvider>
        <ShowTopicsButton />
        <div className="flex-1 md:overflow-y-auto px-3 py-2 md:px-2 ">
          <WindowSizeDetector
            mobileComponentToShow={
              <>
                <div className="flex flex-col gap-3 overflow-y-auto">
                  {/* <Search placeholder="Search Topics" /> */}
                  <Topics query={query} />
                </div>
              </>
            }
            desktopComponentToShow={
              <>
                <div className="flex flex-col gap-3 overflow-y-auto">
                  {/* <Search placeholder="Search Topics" /> */}
                  <Topics query={query} />
                </div>
              </>
            }
          ></WindowSizeDetector>
        </div>
      </SideProvider>
      <div className="shrink-0 px-3 pb-4 md:px-2">
        <SignOutForm />
      </div>
    </div>
  );
}
