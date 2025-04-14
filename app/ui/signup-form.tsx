'use client';
import { useSearchParams } from 'next/navigation';
import { register, StateSignup } from '../lib/actions';
import { useActionState, useState } from 'react';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { CurrencyDollarIcon, UserCircleIcon } from '@heroicons/react/24/solid';

export default function SignUpForm() {
  // const [preview, setPreview] = useState<string | null>(null);
  // const [uploadError, setUploadError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const initialState: StateSignup = { message: null, errors: {} };
  const [state, formAction] = useActionState(register, initialState);
  const callbackUrl = searchParams.get('callbackUrl') || '/login';
  // const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;

  //   // Clear previous errors
  //   setUploadError(null);

  //   try {
  //     const formData = new FormData();
  //     formData.append('file', file);

  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       throw new Error(await response.text());
  //     }

  //     const { url } = await response.json();
  //     setPreview(url);
  //   } catch (error) {
  //     console.error('Upload failed:', error);
  //     setUploadError(
  //       error instanceof Error ? error.message : 'File upload failed'
  //     );
  //   }
  // };
  return (
    <form className="space-y-3 md:space-y-5" action={formAction}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={` mb-3 text-2xl`}>
          Sign Up To See , Add Topics , and Comment on Posts.
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
            // onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {/* {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 h-20 w-20 rounded-full object-cover"
            />
          )}
          {uploadError && (
            <p className="mt-2 text-sm text-red-500">{uploadError}</p>
          )} */}
          {/* <input type="hidden" name="avatar_url" value={preview || ''} /> */}
        </div>
        <div className="mt-6 flex justify-end gap-4 w-full text-center">
          <Button
            className="w-full bg-pink-700 hover:bg-pink-600 flex justify-center"
            type="submit"
          >
            Create Account
          </Button>
        </div>
      </div>
    </form>
  );
}
