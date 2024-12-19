import { HiOutlineX } from 'react-icons/hi';
import { HiMiniArrowDownTray } from 'react-icons/hi2';
import { FormEvent, useEffect, useRef, useState } from 'react';
import BookmarkCard from './BookmarkCard';

type List = { id: number; text: string };

export default function ListEditor({ onClose }: { onClose: () => void }) {
  const [lists, setLists] = useState<List[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = inputRef.current?.value;
    if (!data) return alert('내용을 입력해주세요!');
    setLists([{ id: Date.now(), text: data }]);
    inputRef.current.value = '';
  };

  return (
    <div className='flex flex-col border border-black rounded-md h-[150px] w-[180px] p-4 m-3'>
      <form onSubmit={handleSubmit}>
        <div className='mb-1'>
          <label>List Name :</label>
          <input
            ref={inputRef}
            className='mb-2 border border-gray-400 rounded-md px-2'
          />
        </div>
        <div className='flex items-center justify-center mb-9'>
          <input type='checkbox' />
          <p className='px-1'>이동 시 자동 삭제</p>
        </div>
        <div className='flex gap-2 justify-end'>
          <button
            type='submit'
            className='border border-black px-2 rounded-md py-1'
          >
            <HiMiniArrowDownTray />
          </button>
          <button
            type='reset'
            onClick={onClose}
            className='border border-black px-2 rounded-md py-1'
          >
            <HiOutlineX />
          </button>
        </div>
      </form>
      {lists.map((list) => {
        return (
          <div key={list.id} className='mb-2'>
            <BookmarkCard title={list.text} />
          </div>
        );
      })}
    </div>
  );
}
