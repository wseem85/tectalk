import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import type { User } from '@/app/lib/definitions';
import postgres from 'postgres';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import Credentials from 'next-auth/providers/credentials';
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user', error);
    throw new Error('Failed to fetch user ');
  }
}
export const { auth, signIn, signOut } = NextAuth({
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
  ],
});
