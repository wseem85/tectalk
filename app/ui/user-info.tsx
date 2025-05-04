import { auth } from '@/auth';
import Image from 'next/image';
import { fetchUserByEmail, fetchUserById } from '../lib/data';
import { Avatar } from '@heroui/avatar';
import { User } from '../lib/definitions';

export default async function UserInfo() {
  try {
    const session = await auth();
    console.log(session);
    if (!session || !session.user?.email) {
      return (
        <p className="text-red-500 flex justify-center items-center min-h-20">
          ⚠️ No active session found.
        </p>
      );
    }
    const user: User = await fetchUserById(
      session?.user?.id,
      session.user.providerAccountId
    );

    if (!user)
      return (
        <p className="text-red-500 flex justify-center items-center min-h-20">
          ⚠️ User data not available.
        </p>
      );
    return (
      <div className="flex justify-center items-center gap-4">
        <p>{user.name}</p>
        <Avatar src={user?.avatar || ''} />
      </div>
    );
  } catch (error) {
    return (
      <div className="text-red-500 flex justify-center items-center min-h-20">
        ⚠️ Failed to load user data. Please refresh page to try again.
      </div>
    );
  }
}
