import { BsBookmarkHeart } from 'react-icons/bs';
import Link from 'next/link';
import { auth } from '@/lib/auth';

// import Image from 'next/image';
// import Tokki from '../public/tokki.jpeg';

export default async function Nav() {
  const session = await auth();
  const didLogin = !!session?.user?.email;
  console.log('🚀 Nav - session:', session);

  return (
    <div className='flex items-center justify-between'>
      <Link href='/'>
        <div className='flex items-center justify-between'>
          <p className='text-xl pl-6 pr-1'>Rimi&apos;s Bookmark</p>
          <BsBookmarkHeart />
        </div>
      </Link>

      <div className='flex gap-3 m-3'>
        <Link href='https://github.com/yermxx/bookmark'>
          <button className='px-2.5 py-1 border rounded-full border-black hover:border-gray-500 hover:text-gray-500'>
            Github Repo.
          </button>
        </Link>
        {didLogin ? (
          <Link
            href='/api/auth/signout'
            className='bg-black text-white px-2.5 py-1 rounded-full hover:bg-gray-800'
          >
            Hello! {session.user?.name}
          </Link>
        ) : (
          <Link
            href='/api/auth/signin'
            className='px-2.5 py-1 border rounded-full border-black hover:border-gray-400 hover:text-gray-400'
          >
            Sign In
          </Link>
        )}
        {/* <Image
          src={Tokki}
          alt='토끼'
          width='30'
          height='30'
          className='m-3 border border-gray-400 rounded-3xl h-auto'
        /> */}
      </div>
    </div>
  );
}
