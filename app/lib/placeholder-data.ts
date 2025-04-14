// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
// lib/placeholder-data.ts
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    avatar:
      'https://fwqp5qkk5cd3bhjq.public.blob.vercel-storage.com/postgresql-logo-ElNjbZXdbPFfmGBGMgr12qMtwuJG7u.svg',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: '123456',
    avatar:
      'https://fwqp5qkk5cd3bhjq.public.blob.vercel-storage.com/react-2-gtj63gFg47XhRfXizaMkweolztiMGw.svg',
  },
];

const topics = [
  {
    id: '5c13964a-410d-4b7e-8275-fec4b6a6442a',
    title: 'community',
    description: 'Introduction to the community and basic guidelines',
    user_id: users[0].id, // Created by John Doe
  },
  {
    id: '6d2a1870-743d-4a7b-9173-fec4b6a6442a',
    title: 'general',
    description: 'Open forum for various topics',
    user_id: users[1].id, // Created by Jane Smith
  },
];

const posts = [
  {
    id: '7f4a8b9c-3d2e-4f5a-a6b7-fec4b6a6442a',
    title: 'Welcome to Our Community!',
    text: 'This is the first post welcoming everyone to our platform...',
    user_id: users[0].id, // Posted by John Doe
    topic_id: topics[0].id, // Belongs to "Getting Started" topic
  },
  {
    id: '8e5b9a8c-4f3e-4a7b-9d2c-fec4b6a6442a',
    title: 'Favorite Programming Languages',
    text: "Let's discuss our favorite programming languages and why...",
    user_id: users[1].id, // Posted by Jane Smith
    topic_id: topics[1].id, // Belongs to "General Discussion" topic
  },
];

const comments = [
  {
    id: '9f6c8b7a-5d4e-4f3a-a2b1-fec4b6a6442a',
    text: 'Thanks for the warm welcome! Excited to be here.',
    user_id: users[1].id, // Comment by Jane Smith
    post_id: posts[0].id, // On the welcome post
    parent_id: null,
  },
  {
    id: '1a2b3c4d-5e6f-7a8b-9c0d-fec4b6a6442a',
    text: 'I love TypeScript for its type safety!',
    user_id: users[0].id, // Comment by John Doe
    post_id: posts[1].id, // On the programming languages post
    parent_id: null,
  },
  {
    id: '2b3c4d5e-6f7a-8b9c-0d1e-fec4b6a6442a',
    text: 'Python is great for quick prototyping!',
    user_id: users[1].id, // Comment by Jane Smith
    post_id: posts[0].id, // On the programming languages post
    parent_id: null,
  },
];

export { users, topics, posts, comments };
