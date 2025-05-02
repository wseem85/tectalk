import { Suspense } from 'react';
import SignUpForm from '../ui/signup-form';
import TecTalkLogo from '../ui/tectalk-logo';
import Link from 'next/link';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sign up',
};
export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] md:max-w-[600px] flex-col space-y-2.5 p-4 ">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-secondary p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Link href="/topics">
              <TecTalkLogo />
            </Link>
          </div>
        </div>
        <Suspense>
          <SignUpForm />
        </Suspense>
      </div>
    </main>
  );
}
