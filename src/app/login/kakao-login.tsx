'use client';

import { RiKakaoTalkFill } from 'react-icons/ri';
import { login } from '../../../actions/sign';

export default function KakaoLogin() {
  return (
    <>
      <button
        onClick={async (e) => {
          e.preventDefault();
          try {
            login('kakao');
          } catch (error) {
            alert('로그인에 실패했습니다.');
            console.error('Login failed:', error);
          }
        }}
        className='border px-6 py-2 rounded-md border-gray-500 hover:bg-zinc-100'
      >
        <RiKakaoTalkFill />
      </button>
    </>
  );
}
