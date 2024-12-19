import Login from '@/components/common/molecules/Login';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  return (
    <>
      <Login signin={signIn} />
    </>
  );
}
