export default function BookmarkCardItem() {
  return (
    <div className='border border-gray-400 rounded-lg p-4 flex justify-between items-center gap-4'>
      <div>image</div>
      <div>
        <p>title</p>
        <span>description</span>
      </div>
      <button>Edit</button>
    </div>
  );
}
