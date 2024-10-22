import Image from 'next/image';
import { RoomModel } from '@/app/model/room/room.model';

interface RoomCardProps {
  room: RoomModel
  isActive: boolean
  onSelect: () => void
  getRoomImage: (roomId: number | undefined) => string
  onClickToDetail: (currentId: number | undefined) => void
}

const RoomCard = ({ room, isActive, getRoomImage, onClickToDetail, onSelect }: RoomCardProps) => (
  <div key={room.id}>
    <div
      className={`max-w-80 rounded-lg border border-gray-200 bg-white shadow ${isActive ? 'ring-2 ring-green-500' : ''}`}
      onClick={onSelect}
    >
      <Image
        width={400}
        height={380}
        className="w-80 h-40 cursor-pointer rounded-t-lg object-cover"
        src={getRoomImage(room.id)}
        alt={`cover of ${room.title}`}
        priority
      />
      <div className="p-5">
        <h5
          className={`mb-2 text-lg font-medium tracking-tight ${isActive ? 'text-green-600' : 'text-gray-900'}`}
        >
          {room.name}
        </h5>
        <p className="mb-3 text-sm font-medium text-gray-700">
          {room.price.toLocaleString("ko-kr")}원
        </p>
        <p className="text-sm font-medium">판매자: {room.nickname}</p>
        <button
          onClick={() => onClickToDetail(room.id)}
          className={`mt-5 inline-flex w-full items-center rounded-lg p-3 text-sm font-medium text-white ${isActive
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-green-400 hover:bg-green-500'
            }`}
        >
          상세보기
          <svg
            className="ms-2 size-3.5 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

export default RoomCard;