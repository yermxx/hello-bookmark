import { CiMenuKebab } from 'react-icons/ci';
import Image from 'next/image';
import { useState } from 'react';
import { Card } from './BookmarkCard';
import ItemEditor from './ItemEditor';

export default function BookmarkCardItem({
  url,
  title,
  description,
  image,
}: Card) {
  const [isEdting, setIsEditing] = useState(false);

  return (
    <>
      {!isEdting && (
        <div className='border border-gray-400 rounded-lg p-4 flex justify-between items-center gap-3'>
          <div className='w-20 h-20 shrink-0'>
            <Image src={image} alt={title} width={40} height={40} />
          </div>
          <div>
            <a href={url} target='_blank' rel='noopener noreferrer'>
              {title}
            </a>
            <p>{description}</p>
          </div>
          <button onClick={() => setIsEditing(!isEdting)}>
            <CiMenuKebab />
          </button>
        </div>
      )}
      {isEdting && (
        <ItemEditor
          onSubmit={(data) => {
            console.log(data);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
        />
      )}
    </>
  );
}
