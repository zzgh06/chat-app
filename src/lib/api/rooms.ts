import { Room } from '@/types/room';

export const fetchRooms = async (): Promise<Room[]> => {
  const response = await fetch('/api/rooms');
  if (!response.ok) {
    throw new Error('Failed to fetch rooms');
  }
  return response.json();
};