'use client';

import { useState } from 'react';
import AddList from '../molecules/AddList';
import BookmarkCard from '../molecules/BookmarkCard';

export type ListTitle = { title: string };
export type List = { id: number } & ListTitle;

type Props = {
  title: string;
  cardData: List;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export default function BookmarkList({
  title,
  cardData,
  onDelete,
  onRename,
}: Props) {
  const [cards, setCards] = useState<List[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddCard = (newCard: ListTitle) => {
    const cardData: List = {
      id: Date.now(),
      ...newCard,
    };
    setCards((prev) => [...prev, cardData]);
  };

  const handleDeleteCard = (cardId: number) => {
    setCards(cards.filter((card) => card.id !== cardId));
  };

  const handleUpdateTitle = (cardId: number, newTitle: string) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, title: newTitle } : card
      )
    );
    setIsOpen(false);
  };

  return (
    <>
      <ul className='flex gap-3 p-3'>
        {cards.map((card) => (
          <li key={card.id}>
            <BookmarkCard
              title={card.title}
              cardData={card}
              onClick={handleAddCard}
              onDelete={() => handleDeleteCard(card.id)}
              onRename={handleUpdateTitle}
              onClose={() => setIsOpen(!isOpen)}
            />
          </li>
        ))}
      </ul>
      <AddList
        title={title}
        cardData={cardData}
        lists={cards}
        onClick={handleAddCard}
        onDelete={onDelete}
        onRename={onRename}
      />
    </>
  );
}
