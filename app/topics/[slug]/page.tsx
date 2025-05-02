import { fetchPostsByTopic, fetchTopicByTitle } from '@/app/lib/data';
import { Post, PostWithAuthorAndCommentsCount } from '@/app/lib/definitions';
import { Button } from '@heroui/button';
import PostLink from '@/app/ui/post/post-link';
import { Metadata } from 'next';

import { Avatar } from '@heroui/avatar';

import Link from 'next/link';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const decodedSlug = decodeURIComponent((await params).slug);
  const topic = await fetchTopicByTitle(decodedSlug);

  return {
    title: `${topic.title} - Topics`, // Example: "Programming - Topics"
    description: topic.description, // Optional: Use topic description as meta description
  };
}
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
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 ">
        <Link
          className="underline decoration-solid text-sky-600 hover:text-sky-400"
          href={`/topics`}
          prefetch
        >
          {'< '}Back To Topics
        </Link>
        <h1 className="text-2xl font-bold text-secondary uppercase tracking-wider">
          {topic.title.toUpperCase()}
        </h1>
        <div className="flex text-gray-600 items-center gap-2">
          <p className="mr-1">
            created by :{' '}
            <span className="font-bold italic">{topic.creator_name}</span>
          </p>
          <Avatar size="sm" src={topic.avatar} />
        </div>
        <p className="text-gray-800 text-lg tracking-wide">
          {topic.description}
        </p>
      </div>
      <div>
        <Link href={`/topics/${slug}/posts/new`} prefetch>
          <Button color="primary">Create New Post</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className=" text-lg tracking-wider text-secondary font-bold mt-6">
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
