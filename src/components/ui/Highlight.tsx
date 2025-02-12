export default function Highlight({
  highlight,
  onChange,
}: {
  highlight: string;
  onChange: (highlight: string) => void;
}) {
  const colors = {
    pink: 'bg-pink-200',
    yellow: 'bg-yellow-200',
    blue: 'bg-blue-200',
    green: 'bg-green-200',
    violet: 'bg-violet-200',
  };

  return (
    <div className='flex items-center justify-between mb-2'>
      <label>Highlight</label>
      <div className='border rounded-lg'>
        {Object.entries(colors).map(([key, bgColor]) => (
          <button
            key={key}
            onClick={(e) => {
              e.preventDefault(); // 이벤트 전파 방지
              e.stopPropagation(); // 이벤트 전파 방지
              onChange(bgColor);
            }}
            className={`m-2 p-2 rounded-lg ${bgColor} ${
              highlight === bgColor ? 'ring-1 ring-gray-400' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
