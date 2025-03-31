import CreatePostForm from '@/app/ui/post/create-post-form';

export default async function CreatePostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="flex flex-col gap-6">
      <CreatePostForm slug={slug} />
    </div>
  );
}
