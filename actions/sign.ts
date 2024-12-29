'use server';

import { signIn } from '@/lib/auth';

export const myLogin = async (service: string) => {
  await signIn(service);
};
