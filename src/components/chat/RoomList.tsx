'use client';

import { useRooms } from '@/hooks/useRooms';

export const RoomList = () => {
  const { rooms, isLoading } = useRooms();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {rooms.map((room) => (
        <div
          key={room.id}
          className="p-4 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-medium">
              {room.isGroup ? room.name : room.users[0]?.name}
            </h3>
            <span className="text-sm text-gray-500">
              {new Date(room.updatedAt).toLocaleDateString()}
            </span>
          </div>
          {room.lastMessage && (
            <p className="text-sm text-gray-600 mt-1">
              {room.lastMessage.content}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};