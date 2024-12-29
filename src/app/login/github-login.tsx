'use client';

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
      >
        Github
      </button>
    </>
  );
}
