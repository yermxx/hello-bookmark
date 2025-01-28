import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from '@/lib/i18n-zod';
import {
  hashPassword,
  parseZodErrorMessage,
  toErrorMessage,
} from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsedBody = z
      .object({
        username: z.string({
          message: '이름을 입력하세요.',
        }),
        email: z.string().email(),
        password: z.string().min(8).max(14).optional(),
      })
      .safeParse(body);

    if (!parsedBody.success) {
      return NextResponse.json(
        { user: null, message: parseZodErrorMessage(parsedBody.error) },
        { status: 400 }
      );
      // throw new Error(parsedBody.error.message);
    }

    console.log('req.body -', body);

    const { username, email, password } = body;

    const existsUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log('🚀 ~ POST ~ existsUser:', existsUser);

    if (existsUser) {
      return NextResponse.json(
        { user: null, message: 'Already exists user!' },
        { status: 409 }
      );
    }

    const newer = await prisma.user.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
        authType: 'credentials',
      },
    });
    return NextResponse.json(newer);
  } catch (error) {
    return NextResponse.json({
      user: null,
      message: toErrorMessage(error),
      status: 500,
    });
  }
}
