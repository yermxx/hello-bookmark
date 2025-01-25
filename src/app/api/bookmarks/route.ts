import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    const userId = session?.user?.id;
    const existingUser = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    console.log('Existing user:', existingUser);

    if (!session || !session.user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const data = await req.json();
    const bookmark = await prisma.book.create({
      data: {
        ...data,
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json(bookmark);
  } catch (error) {
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};
