import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMessages } from '@/lib/api/fetchMessages';
import { MessagesResponse } from '@/types/message';

export const useMessages = (roomId: string) => {
  return useInfiniteQuery<MessagesResponse, Error, MessagesResponse, [string, string], string | null>({
    queryKey: ['messages', roomId],
    queryFn: ({ pageParam }) => 
      fetchMessages(roomId, { cursor: pageParam as string | undefined }),
    getNextPageParam: (lastPage): string | null => lastPage.nextCursor,
    initialPageParam: null,
  });
};