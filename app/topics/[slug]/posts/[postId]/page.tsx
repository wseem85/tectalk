import { fetchPostbyId } from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import CommentCreateForm from '@/app/ui/comment/comment-create-form';
import CommentList from '@/app/ui/comment/comment-list';
import { auth } from '@/auth';
import { Avatar } from '@heroui/avatar';
import { format } from 'date-fns';
import Link from 'next/link';
interface TopicShowPageProps {
  params: Promise<{
    postId: string;
    slug: string;
  }>;
}
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug, postId } = await params;
  console.log(decodeURIComponent(slug));

  const post = await fetchPostbyId(postId);
  return (
    <div className="flex flex-col mt-6 ">
      <div className="flex flex-col gap-1">
        <Link
          className="underline decoration-solid"
          href={`/topics/${decodeURIComponent(slug)}`}
        >
          {'< '}Back to {decodeURIComponent(slug)}
        </Link>
        <h1 className="text-3xl text-pink-700 font-bold ">{post.title}</h1>
        <div className="flex items-center gap-4">
          <Avatar
            className="w-4 h-4 text-tiny"
            isBordered
            name={post.name}
            src={post.avatar}
          />
          <p className=" italic text-gray-500">{post.name}</p>
          <p>|</p>
          <p className=" italic text-gray-500">
            {format(post.created_at, 'MMM d, yyyy h:mm a')}
          </p>
        </div>
        <p className="border rounded p-4">{post.text}</p>
        <CommentCreateForm avatar={post.avatar} postId={postId} startOpen />
        <CommentList avatar={post.avatar} postId={postId} />
      </div>
    </div>
  );
}
