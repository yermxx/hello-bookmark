'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import ListEditor from './ListEditor';

export default function AddList({
  onClick,
}: {
  onClick: (newCard: { title: string }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className='h-fit self-start m-3'
        >
          +Add another list
        </Button>
      )}
      {isOpen && (
        <ListEditor onClick={onClick} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
