import { TopicWithPostsCount } from '@/app/lib/definitions';
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    let data;
    if (!query) {
      data = await sql<
        TopicWithPostsCount[]
      >`SELECT topics.*,COUNT(posts.id) AS posts_count
       FROM topics
       LEFT JOIN posts ON topics.id = posts.topic_id
       GROUP BY topics.id
       ORDER BY LOWER(TRIM(topics.title)) ASC`;
    } else {
      const searchTerm = `%${query.toLowerCase().trim()}%`;
      data = await sql<
        TopicWithPostsCount[]
      >`SELECT topics.*,COUNT(posts.id) AS posts_count
       FROM topics
       LEFT JOIN posts ON topics.id = posts.topic_id
       WHERE LOWER(TRIM(topics.title)) ILIKE ${searchTerm}
       GROUP BY topics.id
       ORDER BY LOWER(TRIM(topics.title)) ASC`;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Topics data' },
      { status: 500 }
    );
  }
}
