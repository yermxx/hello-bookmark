'use client';

import { useState } from 'react';
import AddList from '../molecules/AddList';
import BookmarkCard from '../molecules/BookmarkCard';

type Title = { title: string };
type Card = { id: number } & Title;

export default function BookmarkList() {
  const [cards, setCards] = useState<Card[]>([]);

  const handleAddCard = (newCard: Title) => {
    const data: Card = {
      id: Date.now(),
      ...newCard,
    };
    setCards((prev) => [...prev, data]);
  };

  return (
    <>
      <ul className='flex gap-3 p-3'>
        {cards.map((card) => (
          <li key={card.id}>
            <BookmarkCard title={card.title} />
          </li>
        ))}
      </ul>
      <AddList onClick={handleAddCard} />
    </>
  );
}
