'use client';

import { myLogin } from '../../../actions/sign';

export default function KakaoLogin() {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          myLogin('kakao');
        }}
      >
        Kakao
      </button>
    </>
  );
}
