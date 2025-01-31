import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

// GET : 전체 북마크 목록 조회
export async function GET(_request: Request) {
  try {
    const bookmarks = await prisma.book.findMany();

    // BigInt를 JSON으로 직렬화할 수 있도록 변환
    const serializedBookmarks = bookmarks.map((bookmark) => ({
      ...bookmark,
      userId: bookmark.userId.toString(),
    }));

    return NextResponse.json(serializedBookmarks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// POST : 새 북마크 생성
export const POST = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session?.user) {
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

    // BigInt -> Number로 변환하여 직렬화 처리
    const serializedBookmark = {
      ...bookmark,
      userId: Number(bookmark.userId),
    };

    return NextResponse.json(serializedBookmark);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};
