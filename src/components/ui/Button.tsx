import { ReactNode } from 'react';

export default function Button({
  children,
  className = '',
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`border rounded-lg bg-black text-white p-2.5 hover:bg-opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
