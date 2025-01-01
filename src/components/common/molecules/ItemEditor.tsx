import { HiOutlineX } from 'react-icons/hi';
import {
  HiMiniArrowDownTray,
  HiArrowUturnRight,
  HiMiniArchiveBoxXMark,
} from 'react-icons/hi2';
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Card } from './BookmarkCard';

type Props = {
  onClose: () => void;
  onSubmit: (data: Card) => void;
};

export default function ItemEditor({ onClose, onSubmit }: Props) {
  const [formData, setFormData] = useState<Card>({
    url: '',
    title: '',
    description: '',
    image: '',
  });
  const itemRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      url: '',
      title: '',
      description: '',
      image: '',
    });
    onClose();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (itemRef.current?.contains(e.target as Node)) {
        return;
      }
      onClose();
    },
    [onClose]
  );

  const fetchMetadata = async (url: string) => {
    const response = await fetch('/api/og', {
      method: 'POST',
      body: JSON.stringify({ url }),
    });
    const data = await response.json();
    return data;
  };

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!formData.url) return;
    const metaData = await fetchMetadata(formData.url);

    setFormData((prev) => ({
      ...prev,
      title: metaData.ogTitle || '',
      description: metaData.ogDescription || '',
      image: metaData.ogImage?.[0]?.url || '',
    }));
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, false);
    };
  }, [handleClickOutside]);

  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
    });
    inputRef.current?.focus();
  }, []);

  return (
    <div ref={itemRef} className='border border-black rounded-lg'>
      <form onSubmit={handleSubmit} className='p-4'>
        <div ref={containerRef} className='flex flex-col mb-4'>
          <label>URL</label>
          <div className='grid grid-cols-4 gap-3'>
            <input
              ref={inputRef}
              name='url'
              value={formData.url}
              onChange={handleChange}
              className='border border-gray-400 rounded-md px-2 col-span-3'
            />
            <button
              onClick={handleClick}
              type='button'
              className='col-span-1 px-4 rounded-lg border border-black mx-2'
            >
              <HiArrowUturnRight />
            </button>
          </div>
        </div>
        <div className='flex flex-col mb-4'>
          <label>Title</label>
          <input
            name='title'
            value={formData.title}
            onChange={handleChange}
            className='border border-gray-400 rounded-md px-2'
          />
        </div>
        <div className='flex flex-col mb-4'>
          <label>Description</label>
          <input
            name='description'
            value={formData.description}
            onChange={handleChange}
            className='border border-gray-400 rounded-md px-2'
          />
        </div>
        <div className='flex flex-col mb-7'>
          <label>Image URL</label>
          <input
            name='image'
            value={formData.image}
            onChange={handleChange}
            className='border border-gray-400 rounded-md px-2'
          />
        </div>
        <div className='flex justify-end gap-3.5 mb-1.5'>
          <button
            type='button'
            className='border border-black px-2 rounded-md py-1'
          >
            <HiMiniArchiveBoxXMark />
          </button>
          <button
            type='submit'
            onClick={() => console.log('Submit button clicked')}
            className='border border-black px-2 rounded-md py-1'
          >
            <HiMiniArrowDownTray />
          </button>
          <button
            onClick={onClose}
            type='reset'
            className='border border-black px-2 rounded-md py-1'
          >
            <HiOutlineX />
          </button>
        </div>
      </form>
    </div>
  );
}
