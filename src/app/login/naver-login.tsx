'use client';

import { SiNaver } from 'react-icons/si';
import { login } from '../../../actions/sign';

export default function NaverLogin() {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          login('naver');
        }}
        className='border px-6 py-2 rounded-md border-gray-500 hover:bg-zinc-100'
      >
        <SiNaver size='10' />
      </button>
    </>
  );
}
