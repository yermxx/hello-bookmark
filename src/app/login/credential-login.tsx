'use client';

import {
  Form,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
  FormControl,
} from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from '@/lib/i18n-zod';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

// z.infer: 일종의 유틸리티 타입
type FormSchemaType = z.infer<typeof FormSchema>;

export default function CredentialLogin() {
  const router = useRouter();

  // const defaultValues =
  // process.env.NODE_ENV !== 'production'
  //   ? {
  //       email: 'sample@gmail.com',
  //       passwd: 'password123',
  //     }
  //   : { email: '', passwd: '' };

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        alert('로그인이 실패했습니다.');
        console.error('로그인 실패', result.error);
      } else {
        // Main 페이지로 이동
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      alert('로그인 처리 중 에러가 발생했습니다.');
      console.error('로그인 처리 중 에러:', error);
    }
  };

  return (
    <>
      {/* <h1 className='text-xl'>Credential Login</h1> */}
      {/* Form은 provider같은 역할 */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Email address...'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldInput
            form={form}
            name='password'
            label='Password'
            placeholder='Password...'
            type='password'
          />
          <div className='my-3 text-gray-600'>
            <Link href='/'>Forgot Password?</Link>
          </div>
          <button
            type='submit'
            className='flex ml-auto bg-black text-white rounded-xl px-12 py-2'
          >
            Sign in
          </button>
        </form>
      </Form>
    </>
  );
}
