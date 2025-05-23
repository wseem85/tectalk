'use client';
import { useSearchParams } from 'next/navigation';
import { authenticate } from '../lib/actions';
import { useActionState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@heroui/button';

export default function LoginForm() {
  const searchParams = useSearchParams();
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  const callbackUrl = searchParams.get('callbackUrl') || '/topics';
  return (
    <form className="space-y-3 md:space-y-5" action={formAction}>
      <div className="flex-1  bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>Please log in to continue.</h1>
        <div className="w-full space-y-3 md:space-y-6">
          <div>
            <label
              className="mb-3 mt-5 block text-xs sm:text-base font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative bg-gray-50">
              <input
                className="peer block w-full rounded-md border bg-whute  border-gray-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs sm:text-base  font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md bg-white border border-gray-300 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <input type="hidden" name="redirectTo" value={callbackUrl} />
        <Button
          type="submit"
          isLoading={isPending}
          disabled={isPending}
          color="primary"
          className=" flex mt-6 py-5 text-base gap-6 justify-center items-center w-full"
          aria-disabled={isPending}
        >
          Log in <ArrowRightIcon className="h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
