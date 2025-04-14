// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// Base types
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  avatar?: string | null;
};

export type Topic = {
  id: string;
  title: string;
  description: string;
  created_at: Date;
  user_id: string;
};

export type Post = {
  id: string;
  title: string;
  text: string;
  created_at: Date;
  user_id: string;
  topic_id: string;
};

export type Comment = {
  id: string;
  text: string;
  created_at: Date;
  user_id: string;
  post_id: string;
};

// Extended types with relationships
export type PostWithRelations = Post & {
  user: User;
  topic: Topic;
  comments: Comment[];
};
export type PostWithAuthor = Post & {
  name: string;
  avatar: string;
};
export type PostWithAuthorAndCommentsCount = Post & {
  author_name: string;
  avatar: string;
  topic_title: string;
  comments_count: number;
};

export type TopicWithPosts = Topic & {
  user: User;
  posts: PostWithRelations[];
};
export type TopicWithPostsCount = Topic & {
  posts_count: number;
};

export type CommentWithUser = Comment & {
  user: User;
};
