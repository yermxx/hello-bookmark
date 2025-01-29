import Button from '@/components/ui/Button';
import { signOut } from '@/lib/auth';

export default function SignOutPage() {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-center m-20'>
        <form
          className='w-1/3 border border-black rounded-xl px-4 py-12'
          action={async () => {
            'use server';
            await signOut({ redirectTo: '/login' });
          }}
        >
          <h1 className='text-2xl font-bold text-center px-4 mb-3'>Signout</h1>
          <p className='text-xl text-stone-500 text-center p-4 mb-2'>
            Are you sure you want to sign out?
          </p>
          <Button
            type='submit'
            className='flex mx-auto border border-black hover:border-0 hover:bg-gray-400 text-black text-lg rounded-xl px-12 py-2'
          >
            Sign out →
          </Button>
        </form>
      </div>
    </div>
  );
}
