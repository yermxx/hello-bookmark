import { ReactNode } from 'react';

export default function GhostButton({
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
      className={`border border-blue-600 rounded-lg bg-white text-blue-600 px-3 py-2.5 hover:bg-opacity-40 ${className}`}
    >
      {children}
    </button>
  );
}
