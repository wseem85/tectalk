'use client';

import { Button } from '@heroui/react';

export default function ErrorBoundaryTopic({ error }: { error: Error }) {
  return (
    <div className="flex flex-col justify-center gap-4 min-h-screen items-center ">
      <div className="flex flex-col gap-2">
        <h1 className="text-center text-2xl text-gray-500 ">
          Sorry , An Unexpecrted Error happened !
        </h1>
        <p className="text-center text-red-500 ">{error.message}</p>
      </div>
      <Button
        color="secondary"
        variant="faded"
        onPress={() => window.location.reload()}
      >
        Retry
      </Button>
    </div>
  );
}
