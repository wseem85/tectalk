import { Suspense } from 'react';

import LoginForm from '../ui/login-form';
import TecTalkLogo from '../ui/tectalk-logo';
import LoginButton from '../ui/login-github-button';
import LoginGithubButton from '../ui/login-github-button';

export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] md:max-w-[600px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-center justify-center rounded-lg bg-pink-600 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <TecTalkLogo />
          </div>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
        <Suspense>
          <LoginGithubButton />
        </Suspense>
      </div>
    </main>
  );
}
