import BookmarkCard from '../molecules/BookmarkCard';

export default function BookmarkList() {
  return (
    <div className='flex gap-3 p-3'>
      <BookmarkCard />
      <BookmarkCard />
      <BookmarkCard />
    </div>
  );
}
