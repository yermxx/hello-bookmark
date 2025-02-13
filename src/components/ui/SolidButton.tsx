import { ReactNode } from 'react';

export default function SolidButton({
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
      className={`rounded-lg bg-black text-white px-3 py-2.5 hover:bg-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
