import React from 'react';
import { usePopover } from './context';

export default function PopoverTrigger({
  asChild = false,
  children,
}: {
  asChild: boolean;
  children: React.ReactNode;
}) {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  if (asChild && children) {
    return React.cloneElement(children as React.ReactElement, {
      ref: triggerRef,
      onClick: handleToggle,
    });
  }

  return (
    <>
      <button ref={triggerRef} onClick={handleToggle}>
        {children}
      </button>
    </>
  );

  // return React.cloneElement(children as React.ReactElement, {
  //   ref: triggerRef,
  //   onClick: () => setIsOpen(!isOpen),
  // });
}
