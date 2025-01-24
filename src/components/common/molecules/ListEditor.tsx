import { usePopover } from '@/components/ui/Popover/context';
import { HiOutlineX } from 'react-icons/hi';
import { HiMiniArrowDownTray } from 'react-icons/hi2';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import BookmarkCard from './BookmarkCard';

type List = { id: number; title: string };

type Props = {
  title: string;
  cardData: List;
  onAdd: (newCard: List) => void;
  onClose: () => void;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function ListEditor({
  title,
  cardData,
  onAdd,
  onClose,
  onDelete,
  onRename,
}: Props) {
  const [lists, setLists] = useState<List[]>([]);
  const [name, setName] = useState(title || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsOpen } = usePopover();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cardData) {
      if (!name) return alert('북마크 이름을 입력해주세요!');
      onRename(cardData.id, name);
      setIsOpen(false);
      onClose();
    } else {
      const data = inputRef.current?.value;
      if (!data) return alert('북마크 이름을 입력해주세요!');

      try {
        const response = await fetch('/api/bookmarks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: data }),
        });
        const newBookmark = await response.json();
        setLists([{ id: newBookmark.id, title: data }]);
        inputRef.current.value = '';
        onClose();
      } catch (error) {
        console.error(error);
        alert('북마크 추가에 실패했습니다.');
      }
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
            onClick={() => {
              onClose();
            }}
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
              onAdd={onAdd}
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
