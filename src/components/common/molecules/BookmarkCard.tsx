'use client';

import Button from '@/components/ui/Button';
import { Popover } from '@/components/ui/Popover/Popover';
import PopoverContent from '@/components/ui/Popover/PopoverContent';
import PopoverTrigger from '@/components/ui/Popover/PopoverTrigger';
import { LuPenLine, LuSettings, LuTrash2 } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { type Book, type CreateBookInput } from '../organisms/BookmarkList';
import BookmarkCardItem from './BookmarkCardItem';
import ItemEditor from './ItemEditor';
import ListEditor from './ListEditor';

export type Card = {
  url: string;
  title: string;
  description: string;
  image: string;
};

export type Item = { id: number } & Card;

type Props = {
  title: string;
  cardData: Book;
  onAdd: (newCard: CreateBookInput) => Promise<Book>;
  onClose: () => void;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function BookmarkCard({
  title,
  cardData,
  onAdd,
  onClose,
  onDelete,
  onRename,
}: Props) {
  const [items, setItems] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
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

  const handleDeleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    // localStorage.removeItem(`bookmarkCard_${title}`);
  };

  const handleEditItem = (id: number, updateData: Card) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...updateData, id } : item))
    );
  };

  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <div className='grid grid-cols-3 items-center'>
        <p className='font-bold p-4 text-2xl col-span-2 text-left px-8'>
          {title}
        </p>
        <div className='flex col-span-1 justify-end p-4'>
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <LuSettings />
              </button>
            </PopoverTrigger>
            <PopoverContent>
              <div className='border rounded-md px-3 py-2 bg-white' role='menu'>
                <div className='flex justify-center'>
                  {isEdit && (
                    <ListEditor
                      title={cardData.title}
                      cardData={cardData}
                      onAdd={onAdd}
                      onClose={() => setIsEdit(false)}
                      onRename={onRename}
                    />
                  )}
                </div>
                {!isEdit && (
                  <div
                    role='menuitem'
                    tabIndex={0}
                    className='flex items-center gap-1.5 hover:bg-gray-200 mb-1 px-2 py-1 rounded cursor-pointer'
                    onClick={() => {
                      setIsEdit(true);
                    }}
                  >
                    <LuPenLine />
                    Rename
                  </div>
                )}
                <div
                  role='menuitem'
                  tabIndex={0}
                  onClick={() => {
                    if (confirm('정말 카드를 삭제하시겠습니까?')) {
                      onDelete(cardData.id);
                      onClose();
                    }
                  }}
                  className='flex items-center gap-1.5 text-red-500 hover:bg-red-100 px-2 py-1 rounded cursor-pointer'
                >
                  <LuTrash2 />
                  Delete
                </div>
              </div>
            </PopoverContent>
          </Popover>
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
        <Button
          type='button'
          onClick={() => setIsOpen(true)}
          className='ml-auto mx-2 mb-2'
        >
          +Add item
        </Button>
      )}
    </div>
  );
}
