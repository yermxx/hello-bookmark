import Button from '@/components/ui/Button';
import { auth, signIn } from '@/lib/auth';
import GithubLogin from './github-Login';
import KakaoLogin from './kakao-login';

// type User = {
//   id: number;
//   nickname: string;
// };

export default async function LoginPage() {
  const session = await auth();
  console.log(session);

  // query('select * from User where id = ? name = ?', [1, 'hong']);
  // const users = await query<User>('select * from User');

  const googleLogin = async (formData: FormData) => {
    'use server';
    const service = formData.get('service') as string;
    await signIn(service);
  };

  const githubLogin = async () => {
    'use server';
    await signIn('github');
  };

  return (
    <>
      {/* <Login signin={signIn} /> */}
      <h1>Login</h1>
      {/* <ul>
        {users.map((user) => {
          <li key={user.id}>{user.nickname}</li>;
        })}
      </ul> */}
      <form action={googleLogin}>
        <input type='hidden' name='service' value='google' />
        <div className='flex gap-3'>
          <Button>Sign In with Google</Button>
          <GithubLogin githubLogin={githubLogin} />
          <KakaoLogin />
        </div>
      </form>
    </>
  );
}
