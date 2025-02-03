import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token?: string;
    refresh_token?: string;
    provider?: string;
    user: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token?: string;
    refresh_token?: string;
    provider?: string;
  }
}
