import { BiLogoGoogle } from 'react-icons/bi';
import Link from 'next/link';
import { auth, signIn } from '../../lib/auth';
// import { query } from '@/lib/db';
import CredentialLogin from './credential-login';
import GithubLogin from './github-login';
import KakaoLogin from './kakao-login';
import NaverLogin from './naver-login';

// type User = {
//   id: number;
//   nickname: string;
//   email: string;
// };

export default async function LoginPage() {
  const session = await auth();
  console.log('🚀 login - session:', session);

  // query('select * from User where id = ? name = ?', [1, 'hong']);
  // const users = await query<User>('select * from User');

  const googleLogin = async (formData: FormData) => {
    'use server';
    const service = formData.get('service') as string;
    await signIn(service, { redirectTo: '/' });
  };

  const githubLogin = async () => {
    'use server';
    await signIn('github', { redirectTo: '/' });
  };

  return (
    <div className='flex justify-center h-full w-screen'>
      <div className='flex flex-col w-2/5 item-center justify-center p-16'>
        <h1 className='text-2xl font-bold text-center p-4 mb-5'>Sign In</h1>
        {/* <ul>
          {users.map((user) => (
            <li key={user.id}>{user.nickname}</li>
          ))}
        </ul> */}
        {/* <EmailLoginForm /> */}
        <CredentialLogin />
        <br />
        <hr />
        <br />
        <div>
          <div className='border border-gray-600 p-4 rounded-lg mb-8 shadow-md'>
            <h1 className='text-center text-lg mb-4'>Or continue with...*</h1>
            <div className='flex justify-around mx-auto'>
              <form action={googleLogin}>
                <input type='hidden' name='service' value='google' />
                <button
                  type='submit'
                  className='border px-6 py-2 rounded-md border-gray-500 hover:bg-zinc-100'
                >
                  <BiLogoGoogle />
                </button>
              </form>
              <GithubLogin githubLogin={githubLogin} />
              <NaverLogin />
              <KakaoLogin />
            </div>
          </div>
          <div className='flex items-center justify-center gap-6'>
            <p>Don&apos;t have an account?</p>
            <Link href='/register'>
              <button
                type='button'
                className='flex ml-auto bg-blue-100 hover:bg-gray-300 text-black rounded-xl px-8 py-2'
              >
                Join now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
