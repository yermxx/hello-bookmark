// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthConfig } from 'next-auth';
import NextAuth, { type Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import prisma from './db';

export const authConfig: NextAuthConfig = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID as string,
      clientSecret: process.env.AUTH_NAVER_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID as string,
      clientSecret: process.env.AUTH_KAKAO_SECRET as string,
    }),
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email as string, // type error 발생으로 타입 선언 방식으로 해결(추후 수정)
            },
          });
          console.log('user!!!', user);

          if (!user) {
            console.log('User found:', user);
            return null;
          }

          // type error 발생으로 타입 선언 방식으로 해결(추후 수정)
          const isPasswordValid = await compare(
            credentials.password as string,
            user.password as string
          );

          if (!isPasswordValid) {
            alert('비밀번호가 일치하지 않습니다.');
            return null;
          }

          return {
            id: user.id.toString(),
            email: user.email,
            name: user.username,
            authType: user.authType,
          };
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ account, user }) {
      if (
        account?.provider === 'google' ||
        account?.provider === 'github' ||
        account?.provider === 'naver' ||
        account?.provider === 'kakao'
      ) {
        const savedUser = await prisma.user.upsert({
          where: { email: user.email || `kakao_${user.id}@placeholder.com` }, // email이 없을 경우 대체값 지정
          update: {
            username: user.name as string,
            updateAt: new Date(),
          },
          create: {
            email: user.email || `kakao_${user.id}@placeholder.com`,
            username: user.name as string,
            authType: account?.provider,
          },
        });
        // user 객체 업데이트
        user.email = savedUser.email;
        user.id = String(savedUser.id);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token?: JWT }) {
      if (session?.user) {
        session.user.id = token?.sub as string;
        session.user.email = token?.email as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
