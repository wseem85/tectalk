import TecTalkLogo from '@/app/ui/tectalk-logo';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { ArrowUpIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'TecTalk Community',
};
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-24 shrink-0 items-center justify-center rounded-lg bg-secondary p-4 md:h-36">
        <TecTalkLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 ">
          <p
            className={`text-xl text-center text-gray-800 lg:text-2xl xl:text-3xl md:leading-normal`}
          >
            <strong>Welcome to TecTalk.</strong> Your Ultimate Hub for
            <span className=" inline-block font-semibold ml-2 mr-2 text-secondary">
              Technology Talk
            </span>
            , brought to you by F.Dev.
          </p>
          <div className="flex flex-col justify-center gap-8 md:flex-col md:justify-center items-center">
            <Link
              href="/login"
              className="flex ml-auto mr-auto w-40 gap-4 justify-center  rounded-lg bg-blue-500 px-6 py-3 text-sm  font-medium text-white transition-colors hover:bg-blue-400 sm:text-base"
            >
              <span>Log in</span> <ArrowRightIcon className="w-4 md:w-6" />
            </Link>
            <Link
              href="/signup"
              className="flex ml-auto mr-auto w-40 gap-4 justify-center  rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-secondary-400 sm:text-base"
            >
              <span>Sign up</span> <UserPlusIcon className="w-4 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 xl:px-28 xl:py-12">
          <Image
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            src="/hero-desktop.avif"
            width={1000}
            height={666}
          />
          <Image
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing mobile version"
            src="/hero-mobile.avif"
            width={560}
            height={520}
          />
        </div>
      </div>
    </main>
  );
}
