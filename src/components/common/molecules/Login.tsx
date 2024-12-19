'use client';

import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BiLogoGoogle, BiLogoGithub } from 'react-icons/bi';
import { PiSignIn } from 'react-icons/pi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import { FormEvent, useEffect, useRef } from 'react';

type Props = {
  signin: (service: string, options?: { callbackUrl: string }) => void;
};

export default function Login({ signin }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin('google', { callbackUrl: '/' });
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <div className='flex justify-center h-full w-screen'>
      <div className='flex flex-col w-1/3 item-center justify-center p-16'>
        <h1 className='font-bold text-center text-2xl p-4 mb-5'>Sign In</h1>
        <form onSubmit={login}>
          <div className='mb-7'>
            <Label className='text-lg mb-1' htmlFor='email'>
              Email
            </Label>
            <Input id='email' ref={emailRef} />
          </div>
          <div className='mb-5'>
            <Label className='text-lg mb-1' htmlFor='pw'>
              Password
            </Label>
            <Input id='pw' ref={pwRef} />
          </div>
          <div className='flex justify-end mb-10'>
            <Button className='flex items-center justify-center px-5 my-3 text-lg gap-1'>
              <p>Sign in</p>
              <PiSignIn />
            </Button>
          </div>
        </form>
        <br />
        {/* <hr className='my-4 border-gray-400' /> */}
        <div className='border border-gray-600 p-4 rounded-lg mb-5'>
          <h1 className='text-center text-lg mb-4'>Or continue with...*</h1>
          <div className='mb-3'>
            <div className='flex justify-around mx-auto'>
              <button
                onClick={() => signin('google', { callbackUrl: '/' })}
                type='button'
                className='border px-6 py-2 rounded-md border-gray-500'
              >
                <BiLogoGoogle />
              </button>
              <button
                onClick={() => signin('github', { callbackUrl: '/' })}
                type='button'
                className='border px-6 py-2 rounded-md border-gray-500'
              >
                <BiLogoGithub />
              </button>
              <button
                onClick={() => signin('kakao', { callbackUrl: '/' })}
                type='button'
                className='border px-6 py-2 rounded-md border-gray-500'
              >
                <RiKakaoTalkFill />
              </button>
              <button
                onClick={() => signin('naver', { callbackUrl: '/' })}
                type='button'
                className='border px-6 py-2 rounded-md border-gray-500'
              >
                <SiNaver />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
