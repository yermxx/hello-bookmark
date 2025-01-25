import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { toErrorMessage } from '@/lib/utils';

// GET
export const GET = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = params;
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const bookmarks = await prisma.book.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });

    return NextResponse.json(bookmarks);
  } catch (error) {
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};

// PUT
export const PUT = async ({
  req,
  params,
}: {
  req: NextRequest;
  params: { id: string };
}) => {
  try {
    const { id } = params;

    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const data = await req.json();
    const { title } = data;

    const updateBookmark = await prisma.book.update({
      where: { id: Number(id) },
      data: { title },
    });

    return NextResponse.json(updateBookmark);
  } catch (error) {
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};

// DELETE
export const DELETE = async ({ params }: { params: { id: string } }) => {
  try {
    const { id } = params;

    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }

    if (!id) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }

    const deleteBookmark = await prisma.book.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json(deleteBookmark);
  } catch (error) {
    return NextResponse.json(
      { message: toErrorMessage(error) },
      { status: 500 }
    );
  }
};
