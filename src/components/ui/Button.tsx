import { ReactNode } from 'react';

export default function Button({
  children,
  className = '',
  onClick,
  type,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type: 'button' | 'submit' | 'reset' | undefined;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border rounded-lg bg-black text-white p-2.5 hover:bg-opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
