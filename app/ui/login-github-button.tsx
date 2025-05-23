'use client';
import { useFormStatus } from 'react-dom';
import { signInWithGithub } from '../lib/actions';
import { useActionState } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';

export default function LoginGithubButton() {
  const [state, formAction, isPending] = useActionState(
    signInWithGithub,
    undefined
  );
  return (
    <form className="py-4 w-full" action={formAction}>
      <Button
        type="submit"
        isLoading={isPending}
        disabled={isPending}
        className=" flex w-full border-1 border-gray-300 bg-gray-50 duration-75 hover:bg-white hover:border-gray-400 justify-center py-2 rounded-lg gap-2 items-center  text-base    "
      >
        <span>Continue with Github</span>

        <span>
          <Image
            width={22}
            height={22}
            alt="Github Logo"
            src="/github-mark.png"
          />
        </span>
      </Button>
    </form>
  );
}
