'use client';

import SolidButton from '@/components/ui/SolidButton';
import { useSession } from 'next-auth/react';
import { TbRun } from 'react-icons/tb';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { type Bookmark, type CreateBookInput } from '../organisms/BookmarkList';
import ListEditor from './ListEditor';

type Props = {
  title: string;
  lists: Bookmark[];
  cardData: Bookmark;
  onAdd: (newCard: CreateBookInput) => Promise<Bookmark>;
  onClose?: () => void;
  onDelete?: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function AddList({
  title,
  lists,
  cardData,
  onAdd,
  onRename,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  console.log('Session status:', status);

  return (
    <>
      {!isOpen && (
        <SolidButton
          type='button'
          onClick={() => {
            if (status === 'unauthenticated') {
              router.push('/login');
              return;
            }
            setIsOpen(true);
          }}
          className='flex items-center justify-center self-start m-3'
        >
          {lists?.length === 0 ? '+Add List' : '+Add another list..'} <TbRun />
        </SolidButton>
      )}
      {isOpen && (
        <ListEditor
          title={title}
          cardData={cardData}
          onAdd={onAdd}
          onClose={() => setIsOpen(false)}
          onRename={onRename}
        />
      )}
    </>
  );
}
