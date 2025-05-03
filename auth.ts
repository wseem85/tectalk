import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { authConfig } from './auth.config';
import type { User } from '@/app/lib/definitions';
import postgres from 'postgres';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
async function getUser(
  email: string,
  provider?: string
): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email} ${
      provider ? sql`AND provider=${provider}` : sql``
    }`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user', error);
    throw new Error('Failed to fetch user');
  }
}
async function getUserById(id: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE id=${id}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user', error);
    throw new Error('Failed to fetch user ');
  }
}
export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const paresedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (paresedCredentials.success) {
          const { email, password } = paresedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
      authorization: {
        params: {
          redirect_uri:
            process.env.NODE_ENV === 'development'
              ? 'http://localhost:3000/api/auth/callback/github'
              : 'https://tectalk.vercel.app/api/auth/callback/github',
        },
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account }) {
      if (account?.provider === 'github' || account?.provider === 'google') {
        try {
          const existingUser = await getUser(user.email!, account.provider);
          const providerUserId = account.providerAccountId;
          if (!existingUser) {
            await sql`
            INSERT INTO users (name, email, avatar, provider,provider_account_id)
            VALUES (
                    ${user?.name || `${account.provider} User`}, 
                    ${user?.email || ''},
                    ${user?.image || null},
                    ${account.provider},
                    ${providerUserId}
                    )
                    
            ON CONFLICT (email, provider) DO NOTHING
            `;
          }
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
  },
});
