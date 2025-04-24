import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, topics, posts, comments } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
async function clearDatabase() {
  // Drop tables in reverse order of creation to respect foreign keys
  await sql`DROP TABLE IF EXISTS comments CASCADE`;
  await sql`DROP TABLE IF EXISTS posts CASCADE`;
  await sql`DROP TABLE IF EXISTS topics CASCADE`;
  await sql`DROP TABLE IF EXISTS users CASCADE`;
  console.log('Database cleared');
}
async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL,
      password TEXT ,
      avatar VARCHAR(255),
      provider VARCHAR(50) NOT NULL DEFAULT 'credentials',
      provider_account_id VARCHAR(255),
      CONSTRAINT email_provider_unique UNIQUE (email, provider)
    );

  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password,avatar)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword},${user.avatar})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );
  console.log('Users are inserted');
  return insertedUsers;
}

async function seedTopics() {
  await sql`
    CREATE TABLE IF NOT EXISTS topics (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255)  NOT NULL UNIQUE,
      description TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  const insertedTopics = await Promise.all(
    topics.map(
      (topic) =>
        sql`
        INSERT INTO topics (id, title, description, user_id)
        VALUES (${topic.id}, ${topic.title}, ${topic.description}, ${topic.user_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  console.log('Topics are inserted');
  return insertedTopics;
}

async function seedPosts() {
  await sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL UNIQUE,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      topic_id UUID NOT NULL REFERENCES topics(id) ON DELETE CASCADE
    );
     `;

  const insertedPosts = await Promise.all(
    posts.map(
      (post) =>
        sql`
        INSERT INTO posts (id, title, text, user_id, topic_id)
        VALUES (${post.id}, ${post.title}, ${post.text}, ${post.user_id}, ${post.topic_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );
  console.log('Posts are inserted');
  return insertedPosts;
}

async function seedComments() {
  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      text TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
      parent_id UUID  REFERENCES comments(id) ON DELETE CASCADE
    );

  `;

  const insertedComments = await Promise.all(
    comments.map(
      (comment) =>
        sql`
        INSERT INTO comments (id, text, user_id, post_id,parent_id)
        VALUES (${comment.id}, ${comment.text}, ${comment.user_id}, ${comment.post_id},${comment.parent_id})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedComments;
}

export async function GET() {
  try {
    const result = await sql.begin(async (sql) => {
      await clearDatabase();
      await seedUsers();
      await seedTopics();
      await seedPosts();
      await seedComments();
      // return [seedUsers(), seedTopics(), seedPosts(), seedComments()];
      return true;
    });

    return Response.json({ message: 'Database reset and seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
