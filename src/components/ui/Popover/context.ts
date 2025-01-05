import { createContext, useContext } from 'react';

export type Position = {
  top: number;
  left: number;
};

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  position: Position;
  setPosition: (position: Position) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  contentRef: React.RefObject<HTMLDivElement>;
};

export const PopoverContext = createContext<Props>({
  isOpen: false,
  setIsOpen: () => {},
  position: { top: 0, left: 0 },
  setPosition: () => {},
  triggerRef: { current: null },
  contentRef: { current: null },
});

export const usePopover = () => useContext(PopoverContext);
