import { ReactNode } from 'react';

export default function Button({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      className={`border rounded-lg bg-black text-white p-2.5 hover:bg-opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
