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
          <div className='grid grid-cols-4'>
            <input className='border border-gray-400 rounded-md px-2 col-span-3' />
            <button className='col-span-1'>Reset</button>
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
        <div className='flex flex-col mb-8'>
          <label>Image URL</label>
          <input className='border border-gray-400 rounded-md px-2' />
        </div>
        <div className='flex justify-end gap-2'>
          <button type='button'>Delete</button>
          <button onClick={onClose} type='reset'>
            Reset
          </button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
}
