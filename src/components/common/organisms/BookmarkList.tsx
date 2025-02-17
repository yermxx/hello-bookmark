'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import AddList from '../molecules/AddList';
import BookmarkCard from '../molecules/BookmarkCard';

// export type ListTitle = { title: string };
// export type List = { id: number } & ListTitle;

export type Bookmark = {
  id: number;
  title: string;
  deletedAt: Date | null;
  userId: number | bigint; // bigint 타입도 처리할 수 있도록
};

type Props = {
  title: string;
  cardData: Bookmark;
  onDelete: (id: number) => void;
  onRename: (cardId: number, newTitle: string) => void;
};

export type CreateBookInput = {
  title: string;
  userId: number | bigint;
};

export default function BookmarkList({
  title,
  cardData,
  onDelete,
  onRename,
}: Props) {
  const { data: session } = useSession();
  const [cards, setCards] = useState<Bookmark[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const colors = {
    blue: 'bg-blue-200',
    yellow: 'bg-yellow-200',
    red: 'bg-red-200',
    lime: 'bg-lime-200',
    violet: 'bg-violet-200',
    white: 'bg-white',
  };

  const getColorById = (id: number) => {
    const colorValues = Object.values(colors);
    const index = id % colorValues.length;
    return colorValues[index];
  };

  useEffect(() => {
    if (session?.user?.id) {
      console.log('Session user ID:', session.user.id); // 세션 ID 확인
      fetchCards(session.user.id);
    }
  }, [session]);

  const fetchCards = async (id: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${id}`);
      if (!response.ok) {
        throw new Error('Bookmarks fetch에 실패했습니다.');
      }
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addCard = async (newCard: CreateBookInput) => {
    if (!session?.user?.id) {
      console.log('No session user ID');
      throw new Error('No user session');
    }

    try {
      const cardWithUserId = {
        ...newCard,
        userId: session?.user?.id,
      };

      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cardWithUserId),
      });

      if (!response.ok) {
        throw new Error('Bookmark 등록 실패!');
      }

      const savedCard = await response.json();
      setCards((prev) => [...prev, savedCard]);
      return savedCard;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const deleteCard = async (cardId: number) => {
    try {
      const response = await fetch(`/api/bookmarks/${cardId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCards(cards.filter((card) => card.id !== cardId));
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  const updateCard = async (cardId: number, newTitle: string) => {
    try {
      const response = await fetch(`/api/bookmarks/${cardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });

      if (response.ok) {
        setCards(
          cards.map((card) =>
            card.id === cardId ? { ...card, title: newTitle } : card
          )
        );
        setIsOpen(false);
      }
    } catch (error) {
      console.error('Error', error);
    }
  };

  // const handleAddCard = (newCard: ListTitle) => {
  //   const cardData: List = {
  //     id: Date.now(),
  //     ...newCard,
  //   };
  //   setCards((prev) => [...prev, cardData]);
  // };

  // const handleDeleteCard = (cardId: number) => {
  //   setCards(cards.filter((card) => card.id !== cardId));
  // };

  // const handleUpdateTitle = (cardId: number, newTitle: string) => {
  //   setCards((prev) =>
  //     prev.map((card) =>
  //       card.id === cardId ? { ...card, title: newTitle } : card
  //     )
  //   );
  //   setIsOpen(false);
  // };

  return (
    <>
      <ul className='flex gap-5 p-3 h-full overflow-auto flex-1'>
        {cards.map((card) => (
          <li key={card.id} className='h-full'>
            <BookmarkCard
              bookmarkId={card.id.toString()}
              title={card.title}
              cardData={card}
              onAdd={addCard}
              onDelete={() => deleteCard(card.id)}
              onRename={updateCard}
              onClose={() => setIsOpen(!isOpen)}
              bgColor={getColorById(card.id)}
            />
          </li>
        ))}
      </ul>
      <AddList
        title={title}
        cardData={cardData}
        lists={cards}
        onAdd={addCard}
        // onClick={handleAddCard}
        onDelete={onDelete}
        onRename={onRename}
      />
    </>
  );
}
