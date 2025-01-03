'use client';

import Button from '@/components/ui/Button';
import { TbRun } from 'react-icons/tb';
import { useState } from 'react';
import { List } from '../organisms/BookmarkList';
import ListEditor from './ListEditor';

type Props = {
  onClick: (newCard: { title: string }) => void;
  lists: List[];
};

export default function AddList({ onClick, lists }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className='flex items-center justify-center self-start m-3'
        >
          {lists?.length === 0 ? '+Add List' : '+Add another list..'} <TbRun />
        </Button>
      )}
      {isOpen && (
        <ListEditor onClick={onClick} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
