'use client';

import { CurrencyDollarIcon, HashtagIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Button } from '../button';
import { createPost } from '@/app/lib/actions';
import { StatePost } from '@/app/lib/actions';
import { useActionState } from 'react';
export default function CreatePostForm({ slug }: { slug: string }) {
  const initialState: StatePost = { message: null, errors: {} };
  const [state, formAction] = useActionState(
    createPost.bind(null, slug),
    initialState
  );

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Post Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                placeholder="Enter Post Title"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="amount-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Post Content
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="text"
                name="text"
                placeholder="Enter Post Content"
                className="peer min-h-96 block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="description-error"
              />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.text &&
              state.errors.text.map((error: string) => (
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
        <div className="mt-6 flex justify-end gap-4">
          <Button type="submit">Create Post</Button>
        </div>
      </div>
    </form>
  );
}
