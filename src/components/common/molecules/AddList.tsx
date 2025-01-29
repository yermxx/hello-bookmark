'use client';

import Button from '@/components/ui/Button';
import { TbRun } from 'react-icons/tb';
import { useState } from 'react';
import { type Book, type CreateBookInput } from '../organisms/BookmarkList';
import ListEditor from './ListEditor';

type Props = {
  title: string;
  lists: Book[];
  cardData: Book;
  onAdd: (newCard: CreateBookInput) => Promise<Book>;
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

  return (
    <>
      {!isOpen && (
        <Button
          type='button'
          onClick={() => setIsOpen(true)}
          className='flex items-center justify-center self-start m-3'
        >
          {lists?.length === 0 ? '+Add List' : '+Add another list..'} <TbRun />
        </Button>
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
