import BookmarkCardItem from './BookmarkCardItem';

export default function BookmarkCard() {
  return (
    <div className='flex flex-col border border-black p-2 rounded-md h-[500px] w-[300px] flex-shrink-0'>
      <p className='text-center p-2'>Title</p>
      <div className='overflow-y-auto flex-1'>
        <div className='space-y-2 mb-2 '>
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
          <BookmarkCardItem />
        </div>
      </div>
      <button className='ml-auto mt-2'>+Add item</button>
    </div>
  );
}
