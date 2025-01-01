'use client';

import Button from '@/components/ui/Button';
import { useEffect, useRef, useState } from 'react';
import BookmarkCardItem from './BookmarkCardItem';
import ItemEditor from './ItemEditor';

export type Card = {
  url: string;
  title: string;
  description: string;
  image: string;
};

export type Item = { id: number } & Card;

export default function BookmarkCard({ title }: { title: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      addRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  const handleAddItem = (newItem: Card) => {
    const data: Item = {
      id: Date.now(),
      ...newItem,
    };
    setItems((prev) => [...prev, data]);
  };

  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <p className='text-center font-bold p-4 text-2xl'>{title}</p>
      <div className='overflow-y-auto flex-1'>
        <div className='space-y-2 mb-2 '>
          {items.map((item) => (
            <BookmarkCardItem
              key={item.id}
              url={item.url}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
          {isOpen && (
            <div ref={addRef}>
              <ItemEditor
                onSubmit={handleAddItem}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>
      </div>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className='ml-auto mx-2 mb-2'>
          +Add item
        </Button>
      )}
    </div>
  );
}
