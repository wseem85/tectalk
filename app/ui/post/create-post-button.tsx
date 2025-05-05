// app/components/create-topic-button.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';

export default function CreatePostButton({ slug }: { slug: string }) {
  const router = useRouter();

  return (
    <Button
      className="mt-3 p-3 w-20"
      color="primary"
      radius="sm"
      onPress={() =>
        router.push('/topics/${slug}/posts/new', { scroll: false })
      }
    >
      Create New Topic
    </Button>
  );
}
