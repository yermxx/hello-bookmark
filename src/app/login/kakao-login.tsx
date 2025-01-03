'use client';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { login } from '../../../actions/sign';

export default function KakaoLogin() {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          login('kakao');
        }}
        className='border px-6 py-2 rounded-md border-gray-500 hover:bg-zinc-100'
      >
        <RiKakaoTalkFill />
      </button>
    </>
  );
}
