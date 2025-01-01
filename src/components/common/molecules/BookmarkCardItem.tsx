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
        <div className='border border-gray-400 rounded-lg p-4 flex justify-between items-center gap-3 m-2'>
          <div className='shrink-0'>
            <Image src={image} alt={title} width={40} height={40} />
          </div>
          <div className='w-44'>
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold'
            >
              {title}
            </a>
            <p className='overflow-hidden whitespace-nowrap text-ellipsis text-gray-400'>
              {description}
            </p>
          </div>
          <div className='flex items-start justify-center self-start'>
            <button onClick={() => setIsEditing(!isEdting)}>
              <CiMenuKebab />
            </button>
          </div>
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
