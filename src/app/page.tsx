import BookmarkList from '@/components/common/organisms/BookmarkList';

export default function Home() {
  return (
    <>
      <main className='w-full h-full p-3'>
        <div className='overflow-x-hidden hover:overflow-x-auto w-full h-full'>
          <div className='flex min-w-max gap-3 h-full'>
            <BookmarkList />
          </div>
        </div>
      </main>
    </>
  );
}
