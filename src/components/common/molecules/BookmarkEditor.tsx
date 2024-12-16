export default function BookmarkEditor() {
  return (
    <div className='border border-black rounded-lg w-[250px] h-[300px]'>
      <form className='p-4'>
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
          <button>Delete</button>
          <button>Reset</button>
          <button>Save</button>
        </div>
      </form>
    </div>
  );
}
