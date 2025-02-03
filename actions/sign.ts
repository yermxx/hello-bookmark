'use server';

import { signIn } from '@/lib/auth';

export const login = async (service: string) => {
  await signIn(service, { redirectTo: '/' });
};

// 네이버 OAuth 토큰 삭제(무효화)
export const deleteNaverToken = async (access_token: string) => {
  try {
    const response = await fetch('https://nid.naver.com/oauth2.0/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'delete',
        client_id: process.env.NAVER_CLIENT_ID!,
        client_secret: process.env.NAVER_CLIENT_SECRET!,
        access_token: access_token,
        service_provider: 'NAVER',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete Naver token!!');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting Naver token:', error);
    throw error;
  }
};
