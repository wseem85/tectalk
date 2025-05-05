// import { TopicListWith } from '@/app/ui/topic/topics-list-wrapper';

import { Topics } from '@/app/ui/topic/topics-and-search';

import Link from 'next/link';

import { Button } from '@heroui/button';

// import SignOutForm from '@/app/ui/signout-form';
import UserInfo from '@/app/ui/user-info';
import TecTalkLogo from '@/app/ui/tectalk-logo';

import WindowSizeDetector from '@/app/ui/window-size-detector';
import { SideProvider } from '@/app/ui/side-context';
import ShowTopicsButton from '@/app/ui/topic/show-topics-button';
import SignOutForm from '@/app/ui/signout-form';
import CreateTopicButton from '@/app/ui/topic/create-topic-button';

export default async function SidePage({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query || '';
  return (
    <div className="flex md:h-screen   flex-col  ">
      <div className="shrink-0 flex flex-col gap-1 py-4">
        <Link
          className=" inline-block my-2  h-20 items-center justify-start  bg-secondary p-4 "
          href="/"
        >
          <TecTalkLogo />
        </Link>
        <div className="mx-2">
          <UserInfo />

          <CreateTopicButton />
        </div>
        <div className=" my-3">
          <SignOutForm />
        </div>
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
    </div>
  );
}
