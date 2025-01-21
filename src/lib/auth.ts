import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import Github from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Google,
    Github,
    Naver,
    Kakao,
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        passwd: { label: 'passwd', type: 'password' },
      },
      async authorize(credentials) {
        if (
          credentials?.email === 'yrlee1023@example.com' &&
          credentials?.passwd === 'test1023'
        ) {
          return {
            id: '1',
            email: 'yrlee1023@example.com',
            name: 'rimi',
          };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ account, profile }) {
      console.log('cb - account', account);
      console.log('cb - profile', profile);
      return true;
    },
    async jwt({ token, user }) {
      console.log('token', token);
      console.log('user', user);
      return token;
    },
    async session({ session, user }) {
      console.log('cb - session', session);
      console.log('cb - user', user);
      return session;
    },
  },
  trustHost: true,
});
