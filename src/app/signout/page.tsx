import SolidButton from '@/components/ui/SolidButton';
import { redirect } from 'next/navigation';
import { auth, signOut } from '@/lib/auth';
import { deleteNaverToken } from '../../../actions/sign';

export default async function SignOutPage() {
  const session = await auth();

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center m-20'>
        <form
          className='w-1/3 border border-black rounded-xl px-4 py-12'
          action={async () => {
            'use server';

            if (session?.provider === 'naver' && session.access_token) {
              await deleteNaverToken(session.access_token);
              await signOut({ redirect: false });
              // redirect('https://nid.naver.com/nidlogin.logout');
              redirect('/login');
            } else if (session?.provider === 'kakao' && session.access_token) {
              await signOut({ redirect: false });
              const kakaoLogoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${process.env.AUTH_KAKAO_ID}&logout_redirect_uri=${encodeURIComponent(process.env.AUTH_URL + '/login')}`;
              redirect(kakaoLogoutUrl);
            } else {
              await signOut({ redirect: false });
              redirect('/login');
            }
          }}
        >
          <h1 className='text-2xl font-bold text-center px-4 mb-3'>Signout</h1>
          <p className='text-xl text-stone-500 text-center p-4 mb-2'>
            Are you sure you want to sign out?
          </p>
          <SolidButton
            type='submit'
            className='flex mx-auto border border-black hover:border-0 hover:bg-gray-400 text-black text-lg rounded-xl px-12 py-2'
          >
            Sign out →
          </SolidButton>
        </form>
      </div>
    </div>
  );
}
