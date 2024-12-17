'use client';

import ListEditor from '@/components/common/molecules/ListEditor';
import BookmarkList from '@/components/common/organisms/BookmarkList';
import Button from '@/components/ui/Button';
import { useState } from 'react';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <main className='w-full h-full p-3'>
        <div className='overflow-x-scroll w-full'>
          <div className='flex min-w-max gap-3'>
            <BookmarkList />
            <div>
              {!isOpen && (
                <Button
                  onClick={() => setIsOpen(true)}
                  className='h-fit self-start m-3'
                >
                  +Add another list
                </Button>
              )}
              {isOpen && <ListEditor onClose={() => setIsOpen(false)} />}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
