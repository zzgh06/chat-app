import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchRooms } from '@/lib/api/fetchRooms';
import type { Message, Room } from '@/types/room';

export const useRooms = () => {
  const queryClient = useQueryClient();

  const {
    data: rooms = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['rooms'],
    queryFn: fetchRooms,
    staleTime: 1000 * 60, 
  });

  // 새 메시지 수신 시 채팅방 목록 업데이트
  const updateRoomLastMessage = (roomId: string, message: Message) => {
    queryClient.setQueryData<Room[]>(['rooms'], (old = []) => 
      old.map(room => 
        room.id === roomId 
          ? { ...room, lastMessage: message, updatedAt: new Date().toISOString() }
          : room
      )
    );
  };

  return {
    rooms,
    isLoading,
    error,
    updateRoomLastMessage,
  };
};