import { HiOutlineX } from 'react-icons/hi';
import {
  HiMiniArrowDownTray,
  HiArrowUturnRight,
  HiMiniArchiveBoxXMark,
} from 'react-icons/hi2';
import { FormEvent } from 'react';

export default function ItemEditor({ onClose }: { onClose: () => void }) {
  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='border border-black rounded-lg'>
      <form onSubmit={handlerSubmit} className='p-4'>
        <div className='flex flex-col mb-4'>
          <label>URL</label>
          <div className='grid grid-cols-4 gap-3'>
            <input className='border border-gray-400 rounded-md px-2 col-span-3' />
            <button className='col-span-1 px-4 rounded-lg border border-black mx-2'>
              <HiArrowUturnRight />
            </button>
          </div>
        </div>
        <div className='flex flex-col mb-4'>
          <label>Title</label>
          <input className='border border-gray-400 rounded-md px-2' />
        </div>
        <div className='flex flex-col mb-4'>
          <label>Description</label>
          <input className='border border-gray-400 rounded-md px-2' />
        </div>
        <div className='flex flex-col mb-7'>
          <label>Image URL</label>
          <input className='border border-gray-400 rounded-md px-2' />
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
