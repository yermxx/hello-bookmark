import { ReactNode, useEffect, useRef, useState } from 'react';
import { PopoverContext, type Position } from './context';

export function PopoverProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 외부 영역 클릭 시 Content 닫힘
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside, false);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside, false);
      };
    }
  }, [isOpen]);

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
