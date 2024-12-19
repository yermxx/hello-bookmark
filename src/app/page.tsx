import BookmarkList from '@/components/common/organisms/BookmarkList';

export default function Home() {
  return (
    <>
      <main className='w-full h-full p-3'>
        <div className='overflow-x-scroll w-full'>
          <div className='flex min-w-max gap-3'>
            <BookmarkList />
          </div>
        </div>
      </main>
    </>
  );
}
