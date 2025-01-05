import { ReactNode } from 'react';
import { PopoverProvider } from './PopoverProvider';

export const Popover = ({ children }: { children: ReactNode }) => {
  return <PopoverProvider>{children}</PopoverProvider>;
};
