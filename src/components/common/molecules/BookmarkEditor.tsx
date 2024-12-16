export default function BookmarkEditor({ onClose }: { onClose: () => void }) {
  return (
    <div className='flex flex-col border border-black rounded-md h-[150px] w-[180px] p-4 m-3'>
      <form>
        <div className='mb-1'>
          <label>Bookmark Name :</label>
          <input className='mb-2 border border-gray-400 rounded-md px-2' />
        </div>
        <div className='flex items-center justify-center mb-9'>
          <input type='checkbox' />
          <p className='px-1'>이동 시 자동 삭제</p>
        </div>
        <div className='flex gap-2 justify-end'>
          <button type='reset' onClick={onClose}>
            Reset
          </button>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
}
