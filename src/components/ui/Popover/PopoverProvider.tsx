import { ReactNode, useRef, useState } from 'react';
import { PopoverContext, type Position } from './context';

export function PopoverProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <PopoverContext.Provider
      value={{
        isOpen,
        setIsOpen,
        position,
        setPosition,
        triggerRef,
        contentRef,
      }}
    >
      {children}
    </PopoverContext.Provider>
  );
}
