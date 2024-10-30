'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useMessages } from '@/hooks/useMessages';
import { useInView } from 'react-intersection-observer';
import { Message } from './Message';
import { MessagesResponse } from '@/types/message';
import { InfiniteData } from '@tanstack/react-query';

interface MessageListProps {
  roomId: string;
}

export const MessageList = ({ roomId }: MessageListProps) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useMessages(roomId);

  const { ref, inView } = useInView();
  const listRef = useRef<HTMLDivElement>(null);

  // 메시지 데이터 정렬
  const messages = useMemo(() => {
    const infiniteData = data as InfiniteData<MessagesResponse> | undefined;
    if (!infiniteData?.pages) return [];
    return infiniteData.pages.flatMap(page => page.messages).reverse();
  }, [data]);

  // 새로운 페이지 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (status === 'pending') {
    return <div>Loading messages...</div>;
  }

  if (status === 'error') {
    return <div>Error loading messages</div>;
  }

  return (
    <div className="flex flex-col overflow-y-auto h-full" ref={listRef}>
      <div ref={ref} className="h-4" />
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};