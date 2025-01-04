'use client';

import Button from '@/components/ui/Button';
import { LuDelete } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { List } from '../organisms/BookmarkList';
import BookmarkCardItem from './BookmarkCardItem';
import ItemEditor from './ItemEditor';

export type Card = {
  url: string;
  title: string;
  description: string;
  image: string;
};

export type Item = { id: number } & Card;

type Props = {
  title: string;
  cardData: List;
  onDelete: (cardId: number) => void;
};

export default function BookmarkCard({ title, cardData, onDelete }: Props) {
  const [items, setItems] = useState<Item[]>(() => {
    const savedItems = localStorage.getItem(`bookmarkCard_${title}`);
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (title) {
      localStorage.setItem(`bookmarkCard_${title}`, JSON.stringify(items));
    }
  }, [items, title]);

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
    localStorage.removeItem(`bookmarkCard_${title}`);
  };

  const handleEditItem = (id: number, updateData: Card) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...updateData, id } : item))
    );
  };

  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <div className='grid grid-cols-3 items-center'>
        <p className='font-bold p-4 text-2xl col-span-2 text-right'>{title}</p>
        <div className='flex col-span-1 justify-end p-4 gap-3'>
          <button
            type='button'
            onClick={() => {
              if (confirm('정말 카드를 삭제하시겠습니까?')) {
                onDelete(cardData.id);
                localStorage.removeItem(`bookmarkCard_${title}`);
              }
            }}
          >
            <LuDelete />
          </button>
        </div>
      </div>
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
                  onEdit={handleEditItem}
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
                onEdit={handleEditItem}
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
