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
import { z } from '@/lib/i18n-zod';

const FormSchema = z.object({
  email: z.string().email(),
  passwd: z.string().min(8),
});

// z.infer: 일종의 유틸리티 타입
type FormSchemaType = z.infer<typeof FormSchema>;

export default function CredentialLogin() {
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
      passwd: '',
    },
  });

  const onSubmit = async (values: FormSchemaType) => {
    try {
      const result = await signIn('credentials', {
        email: values.email,
        passwd: values.passwd,
        redirect: false,
      });
      if (result?.error) {
        console.error('로그인 실패', result.error);
      }
    } catch (error) {
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
                    placeholder='ex) aaa123@gmail.com
                '
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormFieldInput
            form={form}
            name='passwd'
            label='passwd'
            placeholder='password...'
            type='password'
          />
          <div className='my-3 text-gray-700'>
            <Link href=''>Forgot Password?</Link>
          </div>
          <button
            type='submit'
            className='flex ml-auto bg-black text-white rounded-md px-4 py-2 mb-6'
          >
            Sign in
          </button>
        </form>
      </Form>
    </>
  );
}
