import type { NextAuthConfig } from 'next-auth';
import postgres from 'postgres';
interface Session {
  user: {
    id?: string;
    name?: string;
    email?: string;
  };
}
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnTopics = nextUrl.pathname.startsWith('/topics');
      if (isOnTopics) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // if user is loggen in but not on dashboard path
        return Response.redirect(new URL('/topics', nextUrl)); // redirect user to topics
      }
      return true; // if user is not in dashboard or not logged in then allow them to access thr route
    },
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (token.id && typeof token.id === 'string') {
        session.user.id = token.id;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
