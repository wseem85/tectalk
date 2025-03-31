import postgres from 'postgres';
import {
  User,
  Topic,
  Post,
  Comment,
  TopicWithPosts,
  PostWithRelations,
  CommentWithUser,
  PostWithUserName,
} from './definitions';
import { formatCurrency } from './utils';
import { auth } from '@/auth';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTopics(query: string) {
  try {
    let data;
    if (!query) {
      data = await sql<Topic[]>`SELECT * FROM topics`;
    }
    if (query) {
      const searchTerm = `%${query.toLowerCase().trim()}%`;
      data = await sql<
        Topic[]
      >`SELECT * FROM topics WHERE LOWER(TRIM(title)) ILIKE ${searchTerm}`;
    }

    // console.log('Data fetch completed after 3 seconds.');

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Topics data.');
  }
}
export async function fetchTopicIdByTitle(topicTitle: string) {
  try {
    const result = await sql`
    SELECT id FROM topics WHERE  LOWER(TRIM(title)) = LOWER(TRIM(${topicTitle}))
    `;
    return result[0].id;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch topic ID');
  }
}
export async function fetchTopicByTitle(topicTitle: string) {
  try {
    const result = await sql`
    SELECT 
        topics.*, 
        users.name as creator_name 
      FROM topics 
      INNER JOIN users ON topics.user_id = users.id
      WHERE LOWER(TRIM(topics.title)) = LOWER(TRIM(${topicTitle}))
   
    `;
    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch topic ID');
  }
}
export async function fetchFilteredTopics(query: string) {
  try {
    const searchTerm = `%${query.toLowerCase().trim()}%`;
    const data = await sql<
      Topic[]
    >`SELECT * FROM topics WHERE LOWER(TRIM(title)) ILIKE ${searchTerm}`;

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Filtered Topics');
  }
}
export async function fetchPostsByTopic(topicId: string) {
  try {
    const result = await sql`
      SELECT 
        posts.id,
        posts.title,
        posts.text,
        posts.created_at,
        users.name as author_name,
        users.id as author_id
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.topic_id = ${topicId}
      ORDER BY posts.created_at DESC
    `;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts for this topic');
  }
}
export async function fetchPostbyId(postId: string) {
  try {
    const result = await sql<PostWithUserName[]>`
    SELECT p.*,u.name FROM posts p
    INNER JOIN users u  ON p.user_id=u.id
    WHERE p.id=${postId}
        `;
    console.log(`result:${result}`);
    return result[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post');
  }
}

export async function fetchCommentsByPostId(postId: string) {
  try {
    const comments = await sql`
    SELECT 
        comments.id AS comment_id,  -- Alias to avoid conflict
        comments.text, 
        comments.created_at, 
        comments.parent_id, 
        users.name AS user_name     -- Alias for clarity
      FROM comments
      INNER JOIN users 
        ON comments.user_id = users.id
      WHERE comments.post_id = ${postId}
      ORDER BY comments.created_at DESC;  -- Newest comments first
    `;
    return comments;
  } catch (error) {
    console.error(error);
    throw new Error('Database Error : Failed To Fetch Comments');
  }
}
