import { useState } from 'react';
import ItemEditor from './ItemEditor';

export default function BookmarkCardItem() {
  const [isEdting, setIsEditing] = useState(false);
  return (
    <>
      {!isEdting && (
        <div className='border border-gray-400 rounded-lg p-4 flex justify-between items-center gap-3'>
          <div>image</div>
          <div>
            <p>title</p>
            <span>description</span>
          </div>
          <button onClick={() => setIsEditing(!isEdting)}>Edit</button>
        </div>
      )}
      {isEdting && <ItemEditor onClose={() => setIsEditing(!isEdting)} />}
    </>
  );
}
