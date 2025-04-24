import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  trustHost: true,
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
    jwt({ token, user, account, profile }) {
      if (user && account) {
        // User is available during sign-in
        token.id = user.id;
        if (account.providerAccountId) {
          token.providerAccountId = account.providerAccountId;
        }

        // Add provider type
        token.provider = account.provider;
        // Add avatar if available from user or profile
        if (user.image) {
          token.avatar = user.image;
        } else if (profile?.picture) {
          // For OAuth providers that might have the avatar in profile
          token.avatar = profile.picture;
        }
      }
      return token;
    },
    session({ session, token }) {
      if (token.id && typeof token.id === 'string') {
        session.user.id = token.id;
      }

      // Add provider information to session
      if (token.providerAccountId) {
        session.user.providerAccountId =
          (token.providerAccountId as string) || undefined;
      }

      if (token.provider) {
        session.user.provider = (token.provider as string) || undefined;
      }
      if (token.avatar) {
        session.user.image = token.avatar as string;
      }

      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
