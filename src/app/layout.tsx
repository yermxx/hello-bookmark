import Nav from '@/components/Nav';
import { SessionProvider } from 'next-auth/react';
import type { Metadata } from 'next';
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
  return (
    <html lang='ko' className='h-full'>
      <body className='font-serif bg-gray-50 h-full flex flex-col'>
        <SessionProvider>
          <header>
            <Nav />
          </header>
          <hr />
          <main className='flex-1 h-full'>{children}</main>
          <hr />
          <footer className='border-t border-black p-2 text-center bottom-0'>
            ©2025 | yrlee
          </footer>
        </SessionProvider>
      </body>
    </html>
  );
}
