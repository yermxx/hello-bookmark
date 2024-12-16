import BookmarkList from '@/components/common/organisms/BookmarkList';
import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <main className='w-full h-full p-3'>
        <div className='overflow-x-scroll w-full'>
          <div className='flex min-w-max gap-3'>
            <BookmarkList />
            <Button className='h-fit self-start m-3'>+Add Bookmark</Button>
          </div>
        </div>
      </main>
    </>
  );
}
