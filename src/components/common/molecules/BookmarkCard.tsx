'use client';

import { Popover } from '@/components/ui/Popover/Popover';
import PopoverContent from '@/components/ui/Popover/PopoverContent';
import PopoverTrigger from '@/components/ui/Popover/PopoverTrigger';
import Button from '@/components/ui/SolidButton';
import { useSession } from 'next-auth/react';
import { LuPenLine, LuSettings, LuTrash2 } from 'react-icons/lu';
import { useCallback, useEffect, useRef, useState } from 'react';
import { type Book, type CreateBookInput } from '../organisms/BookmarkList';
import BookmarkCardItem from './BookmarkCardItem';
import ItemEditor from './ItemEditor';
import ListEditor from './ListEditor';

export type Card = {
  highlight: string;
  url: string;
  title: string;
  description: string;
  image: string;
};

export type Item = { id: number } & Card;

type Props = {
  bookmarkId: string;
  title: string;
  cardData: Book;
  onAdd: (newCard: CreateBookInput) => Promise<Book>;
  onClose: () => void;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
  bgColor: string;
};

export default function BookmarkCard({
  bookmarkId,
  title,
  cardData,
  onAdd,
  onClose,
  onDelete,
  onRename,
  bgColor,
}: Props) {
  const { data: session } = useSession();
  const [lists, setLists] = useState<Item[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const addRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      addRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen]);

  const fetchLists = useCallback(async (bookmarkId: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${bookmarkId}/lists`);
      if (!response.ok) {
        throw new Error('Bookmark Lists fetch에 실패했습니다.');
      }
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }, []);

  useEffect(() => {
    if (bookmarkId) {
      fetchLists(bookmarkId);
    }
  }, [bookmarkId, fetchLists]);

  const addList = async (newList: Card) => {
    try {
      const list = {
        userId: session?.user?.id,
        ...newList,
      };

      const response = await fetch(`/api/bookmarks/${bookmarkId}/lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(list),
      });

      if (!response.ok) {
        throw new Error('리스트 등록 실패!');
      }

      const savedList = await response.json();
      setLists((prev) => [...prev, savedList]);
      return savedList;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const deleteList = async (listId: number) => {
    try {
      const response = await fetch(
        `/api/bookmarks/${bookmarkId}/lists/${listId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        setLists(lists.filter((item) => item.id !== listId));
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const updateList = async (
    listId: number,
    { url, title, image, description, highlight }: Card
  ) => {
    try {
      const response = await fetch(
        `/api/bookmarks/${bookmarkId}/lists/${listId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url, title, image, description, highlight }),
        }
      );

      if (response.ok) {
        setLists(
          lists.map((list) =>
            list.id === listId
              ? { ...list, url, title, image, description, highlight }
              : list
          )
        );
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div
      className={`${bgColor} flex flex-col border border-gray-200 p-2 rounded-md h-full w-96 flex-shrink-0`}
    >
      <div className='grid grid-cols-3 items-center'>
        <p
          className={`${bgColor === 'bg-blue-500' || bgColor === 'bg-green-700' ? 'text-white' : 'text-black'} font-bold p-4 text-xl col-span-2 text-left px-8`}
        >
          {title}
        </p>
        <div className='flex col-span-1 justify-end p-4'>
          <Popover>
            <PopoverTrigger asChild>
              <button>
                <LuSettings
                  color={`${bgColor === 'bg-blue-500' || bgColor === 'bg-green-700' ? 'white' : 'black'}`}
                />
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
            {lists.map((list) => (
              <li key={list.id}>
                <BookmarkCardItem
                  id={list.id}
                  url={list.url}
                  title={list.title}
                  description={list.description}
                  image={list.image}
                  onEdit={updateList}
                  onDelete={deleteList}
                  highlight={list.highlight}
                />
              </li>
            ))}
          </ul>
          {isOpen && (
            <div ref={addRef}>
              <ItemEditor
                onSubmit={(data) => addList(data)}
                onClose={() => setIsOpen(false)}
                onDelete={deleteList}
                onEdit={updateList}
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
