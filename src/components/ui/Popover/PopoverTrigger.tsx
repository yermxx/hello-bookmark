import React from 'react';
import { usePopover } from './context';

export default function PopoverTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  // return (
  //   <>
  //     <button ref={triggerRef} onClick={() => setIsOpen(!isOpen)}>
  //       {children}
  //     </button>
  //   </>
  // );

  return React.cloneElement(children as React.ReactElement, {
    ref: triggerRef,
    onClick: () => setIsOpen(!isOpen),
  });
}
