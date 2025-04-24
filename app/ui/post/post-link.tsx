import { Post, PostWithAuthorAndCommentsCount } from '@/app/lib/definitions';
import { format, formatDistanceToNowStrict } from 'date-fns';
import Link from 'next/link';
import LocalTime from '../local-time';

interface PostLinkProps {
  slug: string;
  post: PostWithAuthorAndCommentsCount;
  topicId: string;
}

export default function PostLink({ slug, post, topicId }: PostLinkProps) {
  return (
    <div className=" bg-gray-100 flex flex-col gap-1 rounded-lg w-full  px-2 py-3">
      <Link
        prefetch
        className="font-bold underline tracking-wide capitalize hover:text-blue-400 duration-75"
        href={`/topics/${slug}/posts/${post.id}#post-content`}
        key={topicId}
      >
        {post.title}
      </Link>
      <LocalTime utcDate={post.created_at} />

      <p className="text-gray-500 italic">
        By {post.author_name}, ({post.comments_count} comments)
      </p>
    </div>
  );
}
