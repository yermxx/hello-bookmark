import { HiOutlineX } from 'react-icons/hi';
import { HiMiniArrowDownTray } from 'react-icons/hi2';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { type ListTitle } from '../organisms/BookmarkList';
import BookmarkCard from './BookmarkCard';

type List = { id: number; title: string };

type Props = {
  title: string;
  cardData: List;
  onClick: (data: ListTitle) => void;
  onClose: () => void;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function ListEditor({
  title,
  cardData,
  onClick,
  onClose,
  onDelete,
  onRename,
}: Props) {
  const [lists, setLists] = useState<List[]>([]);
  const [name, setName] = useState(title || '');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cardData) {
      if (!name) return alert('내용을 입력해주세요!');
      onRename(cardData.id, name);
      onClose();
    } else {
      const data = inputRef.current?.value;
      if (!data) return alert('내용을 입력해주세요!');
      setLists([{ id: Date.now(), title: data }]);
      inputRef.current.value = '';
      onClick({ title: data });
      onClose();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div className='flex flex-col border border-black rounded-md h-[150px] w-[180px] p-4 m-3'>
      <form onSubmit={handleSubmit}>
        <div className='mb-1'>
          <label>List Name :</label>
          <input
            ref={inputRef}
            name='title'
            value={name}
            onChange={handleChange}
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
            <BookmarkCard
              title={list.title}
              cardData={cardData}
              onClick={onClick}
              onClose={onClose}
              onDelete={onDelete}
              onRename={onRename}
            />
          </div>
        );
      })}
    </div>
  );
}
