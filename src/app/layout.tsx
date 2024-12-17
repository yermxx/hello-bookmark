import Nav from '@/components/Nav';
import type { Metadata } from 'next';
import { auth } from '@/lib/auth';
import './globals.css';

// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });

export const metadata: Metadata = {
  title: 'BookMark',
  description: 'BookMark',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log(session);

  return (
    <html lang='ko'>
      <body className='font-serif'>
        <header>
          <Nav />
        </header>
        <hr />
        <main>{children}</main>
        <hr />
        <footer className='mt-2 text-center'>©yrlee</footer>
      </body>
    </html>
  );
}
