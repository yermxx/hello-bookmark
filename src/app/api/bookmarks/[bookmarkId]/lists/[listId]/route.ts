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

    return NextResponse.json(lists);
  } catch (error) {
    console.error('Get error: ', error);
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
}

// PUT : 특정 북마크 리스트 수정
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

    await prisma.mark.update({
      where: { id },
      data: { ...data },
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
