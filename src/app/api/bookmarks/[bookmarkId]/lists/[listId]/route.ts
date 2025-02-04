import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

// GET : 특정 북마크 리스트 조회
export async function GET(
  _request: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const { listId } = params;
    if (!listId) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    const lists = await prisma.mark.findMany({
      where: {
        bookId: Number(listId),
      },
    });

    const serializedLists = lists.map((list) => ({
      ...list,
      bookId: Number(list.bookId), // BigInt를 Number로 변환
    }));

    return NextResponse.json(serializedLists);
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
    params: { listId: string };
  }
) {
  try {
    const { listId } = params;
    const id = parseInt(listId, 10);

    if (!id) {
      return NextResponse.json({ message: 'List not found' }, { status: 404 });
    }

    const data = await req.json();
    const { url, title, image, description } = data;

    await prisma.mark.update({
      where: { id },
      data: { url, title, image, description },
    });

    return NextResponse.json({
      success: true,
      message: 'Bookmark list updated',
    });
  } catch (error) {
    console.error('Put error:', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// DELETE : 특정 북마크 리스트 삭제
export async function DELETE(
  _request: Request,
  { params }: { params: { listId: string } }
) {
  try {
    const { listId } = params;
    const id = parseInt(listId, 10);

    await prisma.mark.delete({
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
