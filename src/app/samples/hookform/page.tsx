'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';

type Inputs = {
  nickname: string;
  email: string;
};

export default function HookFormPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>();

  // type 지정 안해주면 values: FieldValues
  const onSubmit = (values: Inputs) => {
    console.log(values);
    console.log(values.nickname);
    console.log(values.email);
  };

  // watch는 observer같은 느낌!!
  console.log('watch', watch);

  return (
    <>
      <h1>ReactHookForm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='nickname'>Nickname</label>
          <input
            {...register('nickname', { required: '닉네임은 필수값입니다.' })}
            type='text'
            id='nickname'
            name='nickname'
            aria-invalid={!!errors.nickname}
          />
          {errors.nickname?.message && (
            <Alert variant={'destructive'} className='text-red border-0'>
              <AlertTitle>error:</AlertTitle>
              <AlertDescription>
                {errors.nickname.message + ''}
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div>
          <Label htmlFor='email'>email</Label>
          <Input
            {...register('email', {
              required: '이메일은 필수값입니다.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '이메일 형식을 지켜주세요!',
              },
            })}
            id='email'
            name='emal'
            type='email'
            aria-invalid={!!errors.email}
            className='text-red'
          />
          <div className='text-red'>{`${errors.email?.message || ''}`}</div>
        </div>
        {/* disabled는 중복 처리 방지! */}
        <button type='submit' disabled={isSubmitting} className='w-full'>
          Submit
        </button>
      </form>
    </>
  );
}
