import { CiMenuKebab } from 'react-icons/ci';
import Image from 'next/image';
import { useState } from 'react';
import { Card } from './BookmarkCard';
import ItemEditor from './ItemEditor';

type Props = {
  id: number;
  url: string;
  title: string;
  description: string;
  image: string;
  onEdit: (id: number, updateData: Card) => void;
  onDelete: (id: number) => void;
  highlight: string;
};

export default function BookmarkCardItem({
  id,
  url,
  title,
  description,
  image,
  onEdit: onEdit,
  onDelete,
  highlight,
}: Props) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing && (
        <div
          className={`border border-gray-200 rounded-lg p-4 flex justify-between items-center m-2 bg-white h-28`}
        >
          <div className='shrink-0'>
            <Image
              src={image}
              alt={title}
              width={0}
              height={0}
              sizes='100%'
              className='w-16 h-16 object-contain'
            />
          </div>
          <div className='w-44'>
            <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='font-semibold overflow-hidden whitespace-nowrap mb-1 text-ellipsis block w-full'
            >
              <span className={`inline-block w-fit ${highlight}`}>{title}</span>
            </a>
            <p className='overflow-hidden text-sm whitespace-nowrap text-ellipsis text-gray-400'>
              {description}
            </p>
          </div>
          <div className='flex items-start justify-center self-start'>
            <button onClick={() => setIsEditing(!isEditing)}>
              <CiMenuKebab />
            </button>
          </div>
        </div>
      )}
      {isEditing && (
        <ItemEditor
          initialData={{ id, url, title, description, image, highlight }}
          onSubmit={(data) => {
            console.log(data);
            setIsEditing(false);
          }}
          onClose={() => setIsEditing(false)}
          onEdit={onEdit}
          onDelete={() => onDelete(id)}
        />
      )}
    </>
  );
}
