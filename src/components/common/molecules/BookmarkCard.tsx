import Button from '@/components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import BookmarkCardItem from './BookmarkCardItem';
import ItemEditor from './ItemEditor';

export default function BookmarkCard() {
  const [isOpen, setIsOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      addRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <p className='text-center font-bold p-2 text-2xl'>Title</p>
      <div className='overflow-y-auto flex-1'>
        <div className='space-y-2 mb-2 '>
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          {isOpen && (
            <div ref={addRef}>
              <ItemEditor onClose={() => setIsOpen(false)} />
            </div>
          )}
        </div>
      </div>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className='ml-auto mt-2'>
          +Add item
        </Button>
      )}
    </div>
  );
}
