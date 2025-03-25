import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

// GET : 특정 북마크 조회
export async function GET(
  _request: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const { bookmarkId } = params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    if (!bookmarkId) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    // prisma 쿼리 전에 userId 타입 확인
    const userId = Number(session.user.id);
    console.log('User ID for query:', userId);

    const bookmarks = await prisma.book.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    console.error('Get error: ', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// PUT : 특정 북마크 수정
export async function PUT(
  req: NextRequest,
  {
    params,
  }: {
    params: { bookmarkId: string };
  }
) {
  try {
    const { bookmarkId } = params;
    const id = parseInt(bookmarkId, 10);

    if (!id) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const data = await req.json();
    const { title } = data;

    await prisma.book.update({
      where: { id },
      data: { title },
    });

    return NextResponse.json({ success: true, message: 'Bookmark updated' });
  } catch (error) {
    console.error('Put error:', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// DELETE : 특정 북마크 삭제
export async function DELETE(
  _request: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const { bookmarkId } = params;
    const id = parseInt(bookmarkId, 10);

    await prisma.book.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Bookmark deleted' });
  } catch (error) {
    console.error('Delete error: ', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}
