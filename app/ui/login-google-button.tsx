'use client';

import Image from 'next/image';
import { signInWithGoogle } from '../lib/actions';
import { useActionState } from 'react';
import { Button } from '@heroui/button';

export default function LoginGoogleButton() {
  const [state, formAction, isPending] = useActionState(
    signInWithGoogle,
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
        <span>Continue with Google</span>
        <span>
          {/* <Image alt="Google Logo" src="/google.svg" /> */}
          <Image width={22} height={22} alt="Google Logo" src="/google.png" />
        </span>
      </Button>
    </form>
  );
}
