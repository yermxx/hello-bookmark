import Image from 'next/image';
import Tokki from '../public/tokki.jpeg';

export default function Nav() {
  return (
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-xl px-6'>Rimi&apos;s Bookmark</p>
      </div>
      <div className='flex'>
        <button className='hover:text-gray-500'>Github Repo.</button>
        <Image
          src={Tokki}
          alt='토끼'
          width='30'
          height='30'
          className='m-3 border border-gray-400 rounded-3xl h-auto'
        />
      </div>
    </div>
  );
}
