import Link from 'next/link';
import { title } from 'process';

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}
const posts = [
  { title: 'Post  One ', text: 'post one text', id: 1 },
  { title: 'Post Two ', text: 'post two text', id: 2 },
];
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2"> {slug}</h1>
        <h2>Posts List</h2>
        {posts.map((post) => (
          <Link href={`/topics/${slug}/posts/${post.id}`} key={post.id}>
            {post.title}
          </Link>
        ))}
      </div>
      <div>
        <div>Create Post form</div>
      </div>
    </div>
  );
}
