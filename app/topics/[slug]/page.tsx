import {
  fetchPostsByTopic,
  fetchTopicByTitle,
  fetchTopicIdByTitle,
} from '@/app/lib/data';
import { Button } from '@/app/ui/button';
import { auth } from '@/auth';

import Link from 'next/link';

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}
// const posts = [
//   { title: 'Post  One ', text: 'post one text', id: 1 },
//   { title: 'Post Two ', text: 'post two text', id: 2 },
// ];
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  const topic = await fetchTopicByTitle(slug);
  const id = topic.id;

  const posts = await fetchPostsByTopic(id);
 
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2"> {topic.title}</h1>
        <p>{topic.description}</p>
        <p>created by {topic.creator_name}</p>
        <h2>Posts List</h2>
        {posts.length === 0 ? (
          <div>There are no posts under this topic</div>
        ) : (
          posts.map((post) => (
            <Link href={`/topics/${slug}/posts/${post.id}`} key={post.id}>
              {post.title}
            </Link>
          ))
        )}
      </div>
      <div>
        <Link href={`/topics/${slug}/posts/new`}>
          <Button>Create Post</Button>
        </Link>
      </div>
    </div>
  );
}
