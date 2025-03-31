import { fetchPostbyId } from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import CommentCreateForm from '@/app/ui/comment/comment-create-form';
import CommentList from '@/app/ui/comment/comment-list';

interface TopicShowPageProps {
  params: Promise<{
    postId: string;
  }>;
}
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { postId } = await params;

  const post = await fetchPostbyId(postId);
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
        <p className="underline italic text-gray-500">Created by {post.name}</p>
        <p className="border rounded p-4">{post.text}</p>
        <CommentCreateForm postId={postId} startOpen />
        <CommentList postId={postId} />
      </div>
    </div>
  );
}
