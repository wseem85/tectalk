import { Suspense } from 'react';

import LoginForm from '../ui/login-form';
import TecTalkLogo from '../ui/tectalk-logo';
import LoginGithubButton from '../ui/login-github-button';
import Link from 'next/link';
import { Divider } from '@heroui/react';
import LoginGoogleButton from '../ui/login-google-button';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Log in',
};
export default function Page() {
  return (
    <main className="flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] md:max-w-[600px] flex-col  p-4 ">
        <div className="flex h-20 w-full items-center justify-center rounded-t-lg bg-secondary p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Link href="/">
              <TecTalkLogo />
            </Link>
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <div className="px-8">
          <Divider />
        </div>
        <div className="mt-0 py-4 rounded-lg bg-gray-50 px-6 w-full  flex gap-1 flex-col justify-center items-center">
          <Suspense>
            <LoginGithubButton />
          </Suspense>
          <Suspense>
            <LoginGoogleButton />
          </Suspense>

          <div>Don't Have An Account ?</div>
          <Link
            className="bg-transparent underline text-pink-700 hover:text-pink-600"
            href="/signup"
          >
            Create An Account
          </Link>
        </div>
      </div>
    </main>
  );
}
