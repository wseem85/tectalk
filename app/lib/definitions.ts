export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string | null;
  provider?: string;
  provider_account_id?: string | null;
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

export type TopicWithPostsCount = Topic & {
  posts_count: number;
};

export type CommentWithUser = Comment & {
  user: User;
};
