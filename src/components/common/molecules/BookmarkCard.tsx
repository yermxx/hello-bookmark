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

export default function BookmarkCard({
  title,
  storageKey,
}: {
  title: string;
  storageKey: string;
}) {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem(`bookmarkItems_${storageKey}`);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem(`bookmarkItems_${storageKey}`, JSON.stringify(items));
  }, [items, storageKey]);

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

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (id: number, updateData: Card) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...updateData, id } : item))
    );
  };

  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <p className='text-center font-bold p-4 text-2xl'>{title}</p>
      <div className='overflow-y-auto flex-1'>
        <div>
          <ul className='space-y-3.5'>
            {items.map((item) => (
              <li key={item.id}>
                <BookmarkCardItem
                  id={item.id}
                  url={item.url}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  onEdited={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              </li>
            ))}
          </ul>
          {isOpen && (
            <div ref={addRef}>
              <ItemEditor
                onSubmit={handleAddItem}
                onClose={() => setIsOpen(false)}
                onDelete={handleDeleteItem}
                onEdited={handleEditItem}
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
