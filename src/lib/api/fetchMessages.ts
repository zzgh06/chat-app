import { MessagesResponse } from "@/types/message";

interface FetchMessagesParams {
  cursor?: string;
  limit?: number;
}

export const fetchMessages = async (
  roomId: string,
  { cursor, limit = 20 }: FetchMessagesParams = {}
): Promise<MessagesResponse> => {
  const url = new URL(`/api/rooms/${roomId}/messages`, window.location.origin);
  if (cursor) url.searchParams.set('cursor', cursor);
  url.searchParams.set('limit', limit.toString());

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  const data = await response.json();
  return {
    ...data,
    nextCursor: data.nextCursor || null,  
  };
};