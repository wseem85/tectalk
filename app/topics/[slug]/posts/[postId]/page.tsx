import { fetchPostbyId, fetchUserById } from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import CommentCreateForm from '@/app/ui/comment/comment-create-form';
import CommentList from '@/app/ui/comment/comment-list';
import LocalTime from '@/app/ui/local-time';
import { auth } from '@/auth';
import { Avatar } from '@heroui/avatar';

import { fetchCommentsByPostId } from '@/app/lib/data';
import Link from 'next/link';
import { Metadata } from 'next';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string; slug: string }>;
}): Promise<Metadata> {
  const id = (await params).postId;
  const post = await fetchPostbyId(id); // Fetch post data
  return {
    title: `${post.title} - Post`, // Fallback if title is missing
  };
}

interface TopicShowPageProps {
  params: Promise<{
    postId: string;
    slug: string;
  }>;
}
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug, postId } = await params;
  const session = await auth();
  if (!session?.user.id || !session.user.providerAccountId)
    return Error('You are not Signed in ');
  const post = await fetchPostbyId(postId);
  const currentUser = await fetchUserById(
    session.user.id,
    session.user.providerAccountId
  );

  const comments = await fetchCommentsByPostId(postId);
  const currentUserAvatar = currentUser.avatar as string;

  return (
    <div className="flex flex-col mt-6 ">
      <div id="post-content" className="flex flex-col gap-2">
        <Link
          className="underline decoration-solid text-sky-600 hover:text-sky-400"
          href={`/topics/${decodeURIComponent(slug)}`}
        >
          {'< '}Back to {decodeURIComponent(slug)}
        </Link>
        <h1 className="text-3xl text-secondary font-bold ">{post.title}</h1>
        <div className="flex items-center gap-4">
          <Avatar
            className="w-4 h-4 text-tiny"
            isBordered
            name={post.name}
            src={post.avatar}
          />
          <p className=" italic text-gray-500">{post.name}</p>
          <p>|</p>
          <LocalTime utcDate={post.created_at} />
        </div>
        <p className="border rounded p-4">{post.text}</p>
        <CommentCreateForm
          avatar={currentUserAvatar}
          postId={postId}
          startOpen
        />
        <CommentList
          avatar={currentUserAvatar}
          postId={postId}
          comments={comments}
        />
      </div>
    </div>
  );
}
