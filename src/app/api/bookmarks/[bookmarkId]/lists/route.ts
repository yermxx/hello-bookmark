import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

// GET : 전체 리스트 목록 조회
export async function GET(
  _request: Request,
  { params }: { params: { bookmarkId: string } }
) {
  try {
    const session = await auth();

    // 해당 북마크가 현재 유저의 것인지 검증
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(params.bookmarkId),
        userId: Number(session?.user?.id),
      },
    });

    if (!book) {
      return NextResponse.json(
        { message: '해당 북마크에 대한 권한이 없습니다.' },
        { status: 403 }
      );
    }

    const lists = await prisma.mark.findMany({
      where: {
        bookId: parseInt(params.bookmarkId),
      },
    });

    return NextResponse.json(lists);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// POST : 새 북마크 리스트 생성
export const POST = async (
  req: NextRequest,
  { params }: { params: { bookmarkId: string } }
) => {
  try {
    const session = await auth();
    const data = await req.json();

    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(params.bookmarkId),
        userId: Number(session?.user?.id), // 클라이언트에서 현재 로그인한 유저의 ID를 전달해야 함 !!
      },
    });

    if (!book) {
      return NextResponse.json(
        { message: '해당 북마크에 대한 권한이 없습니다.' },
        { status: 403 }
      );
    }

    // 이미 동일한 리스트 존재여부 체크
    const existingList = await prisma.mark.findFirst({
      where: {
        bookId: parseInt(params.bookmarkId),
        url: data.url,
      },
    });

    if (existingList) {
      return Response.json(
        { error: '중복된 북마크 리스트가 있습니다.' },
        { status: 400 }
      );
    }

    const list = await prisma.mark.create({
      data: {
        highlight: data.highlight,
        bookId: parseInt(params.bookmarkId),
        url: data.url,
        title: data.title,
        image: data.image,
        description: data.description,
      },
    });

    return NextResponse.json(list);
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};
