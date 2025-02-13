'use client';

import SolidButton from '@/components/ui/SolidButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PiSignIn } from 'react-icons/pi';
import { FormEvent, useEffect, useRef } from 'react';
import { signIn } from '../../lib/auth';

export default function EmailLoginForm() {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn('google', { callbackUrl: '/' });
  };

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  return (
    <form onSubmit={login} className='py-8'>
      <div className='mb-12'>
        <Label className='text-lg mb-2' htmlFor='email'>
          Email
        </Label>
        <Input id='email' ref={emailRef} />
      </div>
      <div className='mb-8'>
        <Label className='text-lg mb-2' htmlFor='pw'>
          Password
        </Label>
        <Input id='pw' ref={pwRef} />
      </div>
      <div className='flex justify-end mb-10'>
        <SolidButton
          type='submit'
          className='flex items-center justify-center px-5 my-3 text-lg gap-1'
        >
          <p>Sign in</p>
          <PiSignIn />
        </SolidButton>
      </div>
    </form>
  );
}
