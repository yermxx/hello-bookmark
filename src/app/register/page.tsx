'use client';

import { Form } from '@/components/ui/form';
import FormFieldInput from '@/components/ui/form-field-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { SiNaver } from 'react-icons/si';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { z } from '@/lib/i18n-zod';

const registerSchema = z
  .object({
    username: z
      .string()
      .nonempty('Username을 입력해주세요.')
      .regex(
        /^[a-z0-9]{4,12}$/,
        '영문 소문자 또는 영문+숫자 조합 4-12자리를 입력해주세요.'
      ),
    email: z.string().nonempty('Email을 입력해주세요.').email(),
    password: z
      .string()
      .nonempty('Password를 입력해주세요.')
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,14}$/,
        '영문 + 숫자 + 특수문자(!@#$%&*?) 조합 8-14자리를 입력해주세요.'
      ),
    passwordCheck: z.string().nonempty('비밀번호를 다시 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
  });

type RegisterSchemaType = z.infer<typeof registerSchema>;

const oauthProviders = [
  { name: 'google', icon: <BiLogoGoogle /> },
  { name: 'github', icon: <BiLogoGithub /> },
  { name: 'naver', icon: <SiNaver size='10' /> },
  { name: 'kakao', icon: <RiKakaoTalkFill /> },
];

export default function RegisterPage() {
  const router = useRouter();

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/' });
  };

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordCheck: '',
    },
  });

  const onSubmit = async (values: RegisterSchemaType) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      console.log('response data:', data);

      if (!response.ok) {
        alert('회원가입에 실패했습니다.');
        throw new Error('회원가입에 실패했습니다.');
      } else {
        router.push('/login'); // 로그인 페이지로 이동
      }
    } catch (error) {
      alert('회원가입 처리 중 에러가 발생했습니다.');
      console.error('회원가입 처리 중 에러가 발생했습니다.', error);
    }
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='w-1/3'>
        <h1 className='text-2xl font-bold my-12'>Sign Up</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            {/* Name */}
            <FormFieldInput
              form={form}
              name='username'
              label='Name'
              type='name'
            />
            {/* Email */}
            <FormFieldInput
              form={form}
              name='email'
              label='Email'
              placeholder='Email address...'
              type='email'
            />
            {/* Password */}
            <FormFieldInput
              form={form}
              name='password'
              label='Password'
              placeholder='Password...'
              type='password'
            />
            {/* Password Check */}
            <FormFieldInput
              form={form}
              name='passwordCheck'
              label='Confirm Password'
              type='password'
            />
            {/* Submit Button */}
            <div className='flex justify-end'>
              <button
                type='submit'
                className='bg-black text-white rounded-xl px-20 py-2 mt-4'
              >
                Sign Up
              </button>
            </div>
            <br />
            <hr />
            <br />
            {/* OAuth */}
            <div className='border border-gray-600 p-4 rounded-lg mb-5'>
              <h1 className='text-center text-lg mb-4'>Or continue with...*</h1>
              <div className='mb-3'>
                <div className='flex justify-around mx-auto'>
                  {oauthProviders.map((item, idx) => {
                    return (
                      <button
                        key={idx}
                        onClick={() => handleOAuthSignIn(item.name)}
                        type='button'
                        className='border px-6 py-2 rounded-md border-gray-500'
                      >
                        {item.icon}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* Login */}
            <div className='flex gap-3 items-center justify-center pb-8'>
              <p>Already have an account?</p>
              <Link href='/login'>
                <button
                  type='button'
                  className='flex ml-auto bg-blue-100 hover:bg-gray-300 text-black rounded-xl px-8 py-2'
                >
                  Sign In
                </button>
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
