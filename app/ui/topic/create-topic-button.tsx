// app/components/create-topic-button.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';

export default function CreateTopicButton() {
  const router = useRouter();

  return (
    <Button
      className="mt-3 p-3 w-full"
      color="primary"
      radius="sm"
      onPress={() => router.push('/topics/new', { scroll: false })}
    >
      Create New Topic
    </Button>
  );
}
