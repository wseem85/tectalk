import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    // Your custom fields
    provider?: string;
    providerAccountId?: string;
  }

  interface Session {
    user: {
      // Default fields
      name?: string | null;
      email?: string | null;
      image?: string | null;
      // Your custom fields
      id: string;
      provider?: string;
      providerAccountId?: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    provider?: string;
    providerAccountId?: string;
  }
}
