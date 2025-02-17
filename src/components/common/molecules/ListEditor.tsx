import { usePopover } from '@/components/ui/Popover/context';
import { useSession } from 'next-auth/react';
import { HiOutlineX } from 'react-icons/hi';
import { HiMiniArrowDownTray } from 'react-icons/hi2';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { type Bookmark, type CreateBookInput } from '../organisms/BookmarkList';

// import BookmarkCard from './BookmarkCard';

type Props = {
  title?: string;
  cardData: Bookmark;
  onAdd: (newCard: CreateBookInput) => Promise<Bookmark>;
  onClose: () => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function ListEditor({
  title,
  cardData,
  onAdd,
  onClose,
  onRename,
}: Props) {
  const [name, setName] = useState(title || '');
  const inputRef = useRef<HTMLInputElement>(null);
  const { setIsOpen } = usePopover();
  const { data: session } = useSession();

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
        if (!session?.user?.id) {
          throw new Error('사용자 ID가 없습니다.');
        }

        const newCard: CreateBookInput = {
          title: data,
          userId: BigInt(session.user.id),
        };

        const savedCard = await onAdd(newCard);
        if (savedCard) {
          inputRef.current.value = '';
          onClose();
        }
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
    <div className='flex flex-col border border-black rounded-md h-1/5 w-auto p-4 m-3'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col mb-5'>
          <label>List Name :</label>
          <input
            ref={inputRef}
            name='title'
            value={name}
            onChange={handleChange}
            className='mb-2 border border-gray-400 rounded-md px-2'
          />
        </div>
        {/* <div className='flex items-center justify-center mb-9'>
          <input type='checkbox' />
          <p className='px-1'>이동 시 자동 삭제</p>
        </div> */}
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
    </div>
  );
}
