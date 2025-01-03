'use client';

import { BiLogoGithub } from 'react-icons/bi';

type Props = {
  githubLogin: () => void;
};

export default function GithubLogin({ githubLogin }: Props) {
  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault();
          githubLogin();
        }}
        className='border px-6 py-2 rounded-md border-gray-500 hover:bg-zinc-100'
      >
        <BiLogoGithub />
      </button>
    </>
  );
}
