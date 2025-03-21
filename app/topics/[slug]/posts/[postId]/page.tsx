interface TopicShowPageProps {
  params: Promise<{
    postId: string;
  }>;
}
export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { postId } = await params;

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2"> {postId}</h1>
        <p>Posts Title</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab id,
          necessitatibus veniam iure maxime aut, quae culpa provident explicabo
          excepturi vitae animi? Vero, minus sapiente ullam velit perferendis
          ipsum voluptas nostrum suscipit. Tenetur alias odio nihil consectetur
          ipsam excepturi voluptates odit animi nobis impedit quia quis, eveniet
          eligendi, voluptate dolore.
        </p>
      </div>
    </div>
  );
}
