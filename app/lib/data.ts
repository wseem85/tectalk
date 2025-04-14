import postgres from 'postgres';
import {
  User,
  Topic,
  TopicWithPostsCount,
  CommentWithUser,
  PostWithAuthor,
  PostWithAuthorAndCommentsCount,
} from './definitions';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchTopics(query: string) {
  try {
    let data;
    if (!query) {
      data = await sql<
        TopicWithPostsCount[]
      >`SELECT topics.*,COUNT(posts.id) AS posts_count
       FROM topics
       LEFT JOIN posts ON topics.id = posts.topic_id
       GROUP BY topics.id
        ORDER BY LOWER(TRIM(topics.title)) ASC
       `;
    }
    if (query) {
      const searchTerm = `%${query.toLowerCase().trim()}%`;
      data = await sql<
        TopicWithPostsCount[]
      >`SELECT topics.*,COUNT(posts.id) AS posts_count
       FROM topics
       LEFT JOIN posts ON topics.id = posts.topic_id
       WHERE LOWER(TRIM(topics.title)) ILIKE ${searchTerm}
       GROUP BY topics.id
        ORDER BY LOWER(TRIM(topics.title)) ASC
       `;
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
        users.name as creator_name ,
        users.avatar as avatar
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

export async function fetchNewPosts() {
  try {
    const result = await sql<PostWithAuthorAndCommentsCount[]>`
      SELECT 
        posts.*,
        users.name as author_name,
        users.id as author_id,
        topics.title as topic_title,
        COUNT(comments.id) as comments_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN topics ON posts.topic_id = topics.id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id, users.id ,topic_title
      ORDER BY posts.created_at DESC
      LIMIT 5
    `;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch new posts');
  }
}

export async function fetchTopPosts() {
  try {
    const result = await sql<PostWithAuthorAndCommentsCount[]>`
      SELECT 
        posts.*,
        users.name as author_name,
        users.id as author_id,
        topics.title as topic_title ,
        COUNT(comments.id) as comments_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN topics ON posts.topic_id=topics.id
      LEFT JOIN comments ON posts.id = comments.post_id
      GROUP BY posts.id, users.id,topics.title
      ORDER BY comments_count DESC
      LIMIT 5
    `;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch new posts');
  }
}
export async function fetchPostsByTopic(topicId: string) {
  try {
    const result = await sql<PostWithAuthorAndCommentsCount[]>`
      SELECT 
        posts.id,
        posts.title,
        posts.text,
        posts.created_at,
        users.name as author_name,
        users.id as author_id,
        COUNT(comments.id) as comments_count
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN comments ON posts.id = comments.post_id
      WHERE posts.topic_id = ${topicId}
      GROUP BY posts.id, users.id
      ORDER BY comments_count ,posts.created_at DESC
    `;

    return result;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts for this topic');
  }
}
export async function fetchPostbyId(postId: string) {
  try {
    const result = await sql<PostWithAuthor[]>`
    SELECT p.*,u.name,u.avatar FROM posts p
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
        users.name AS user_name,     -- Alias for clarity
        users.avatar AS user_avatar
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

export async function fetchUsers() {
  try {
    const data = await sql<User[]>`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Can not fetch users');
  }
}
export async function fetchUserByEmail(email: string) {
  try {
    const data = await sql<User[]>`SELECT * FROM users WHERE email=${email} `;

    return data[0];
  } catch (error) {
    console.error(error);
    throw new Error('Can not fetch users');
  }
}
