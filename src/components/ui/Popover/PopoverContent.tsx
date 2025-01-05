import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { usePopover } from './context';

export default function PopoverContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, triggerRef, contentRef, position, setPosition } =
    usePopover();

  // isOpen이 바뀔 때마다 위치 계산
  useEffect(() => {
    if (triggerRef?.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
      });
    }
  }, [isOpen, triggerRef, setPosition]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      className='absolute z-50'
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {children}
    </div>,
    document.body
  );
}
