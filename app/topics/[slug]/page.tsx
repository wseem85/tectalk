import {
  fetchPostsByTopic,
  fetchTopicByTitle,
  fetchTopicIdByTitle,
  fetchUsers,
} from '@/app/lib/data';
import { Post, PostWithAuthorAndCommentsCount } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import PostLink from '@/app/ui/post/post-link';
import ScrollToHash from '@/app/ui/scrool-to-hash';
import TopicSkeleton from '@/app/ui/topic/topic-skeleton';
import WindowSizeDetector from '@/app/ui/window-size-detector';
import { Avatar } from '@heroui/avatar';

import Link from 'next/link';

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  const topic = await fetchTopicByTitle(decodeURIComponent(slug));
  const id = topic.id;

  const posts: PostWithAuthorAndCommentsCount[] = await fetchPostsByTopic(id);

  return (
    <div className="flex flex-col gap-6">
      {/* <WindowSizeDetector } /> */}
      {/* <ScrollToHash /> */}
      <div className="flex flex-col ">
        <h1 className="text-2xl font-bold text-pink-700 uppercase tracking-wider">
          {topic.title.toUpperCase()}
        </h1>
        <div className="flex text-gray-600 items-center gap-2">
          <p className="mr-1">
            created by :{' '}
            <span className="font-bold italic">{topic.creator_name}</span>
          </p>
          <Avatar src={topic.avatar} />
        </div>
        <p className="text-gray-800 text-lg tracking-wide">
          {topic.description}
        </p>
      </div>
      <div>
        <Link href={`/topics/${slug}/posts/new`}>
          <Button>Create New Post</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className=" text-lg tracking-wider text-pink-600 font-bold mt-6">
          Posts List
        </h2>
        {posts.length === 0 ? (
          <div>There are no posts under this topic</div>
        ) : (
          <div className="flex flex-col gap-2">
            {posts.map((post) => (
              <PostLink
                key={post.id}
                slug={slug}
                post={post}
                topicId={topic.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
