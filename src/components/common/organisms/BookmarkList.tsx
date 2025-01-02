'use client';

import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import AddList from '../molecules/AddList';
import BookmarkCard from '../molecules/BookmarkCard';

type ListTitle = { title: string };
export type List = { id: number } & ListTitle;

export default function BookmarkList() {
  const [cards, setCards] = useState<List[]>([]);

  const handleAddCard = (newCard: ListTitle) => {
    const data: List = {
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
            <BookmarkCard title={card.title} storageKey={uuidv4()} />
          </li>
        ))}
      </ul>
      <AddList lists={cards} onClick={handleAddCard} />
    </>
  );
}
