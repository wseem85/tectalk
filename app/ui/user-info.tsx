import { auth } from '@/auth';
import Image from 'next/image';
import { fetchUserByEmail } from '../lib/data';
import { Avatar } from '@heroui/avatar';
import { User } from '../lib/definitions';

export default async function UserInfo() {
  const session = await auth();
  if (!session || !session.user?.email)
    return <p>We can not find out if a user is signed in</p>;
  const user: User = await fetchUserByEmail(session?.user?.email);
  return (
    <div className="flex items-center gap-4">
      <Avatar src={user.avatar} />
      <p>{user.name}</p>
    </div>
  );
}
