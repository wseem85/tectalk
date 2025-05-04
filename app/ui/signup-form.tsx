'use client';

import { register, StateSignup } from '../lib/actions';
import { useActionState } from 'react';
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';

import { Button } from '@heroui/button';
import { UserCircleIcon } from '@heroicons/react/24/solid';

export default function SignUpForm() {
  const initialState: StateSignup = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(register, initialState);

  return (
    <form style={{ marginTop: 0 }} action={formAction}>
      <div className="flex-1 rounded-b-lg bg-gray-50 px-6">
        <h1 className="mb-3 text-2xl py-6">
          Join our community to share your ideas and discover inspiring
          perspectives from others!".
        </h1>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter a Valid Email Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter a Valid Name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter Your Password"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="password-error"
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
          <div>
            {state.message ? (
              <p className="mt-2 text-sm text-red-500">{state.message}</p>
            ) : null}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="avatar" className="mb-2 block text-sm font-medium">
            Profile Image
          </label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4 w-full text-center">
          <Button
            isLoading={isPending}
            disabled={isPending}
            color="secondary"
            className="w-full flex justify-center"
            type="submit"
          >
            Create Account
          </Button>
        </div>
      </div>
    </form>
  );
}
