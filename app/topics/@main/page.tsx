// export default function MainPage({ children }: { children: React.ReactNode }) {

//   return <div>{children}</div>;
// }
import { format, formatDistanceToNow } from 'date-fns';
import { fetchTopPosts, fetchNewPosts } from '@/app/lib/data';
import PostLink from '@/app/ui/post/post-link';
import { Divider } from '@heroui/react';

export default async function MainPage() {
  const newPosts = await fetchNewPosts();
  const topPosts = await fetchTopPosts();

  return (
    <div className="space-y-12">
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl text-gray-50 bg-pink-600 p-2  sm:w-1/2">
          New Posts
        </h2>
        {newPosts.map((post) => (
          <PostLink
            key={post.id}
            slug={post.topic_title}
            post={post}
            topicId={post.topic_id}
          />
        ))}
      </div>
      <Divider />
      <div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl text-gray-50 bg-pink-600 p-2  sm:w-1/2">
            Top Posts
          </h2>
          {topPosts.map((post) => (
            <PostLink
              key={post.id}
              slug={post.topic_title}
              post={post}
              topicId={post.topic_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
