'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { socket, useSocket } from '@/lib/socket';
import { useRooms } from '@/hooks/useRooms';

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { connect, disconnect, isConnected } = useSocket();
  const { updateRoomLastMessage } = useRooms();

  // 세션 있을 때 소켓 연결
  useEffect(() => {
    if (session?.user?.id) {
      connect(session.user.id);
    } else {
      disconnect();
    }

    return () => {
      disconnect();
    };
  }, [session, connect, disconnect]);

  // 소켓 이벤트 리스너
  useEffect(() => {
    if (!isConnected) return;

    // 새 메시지 수신 시 채팅방 목록 업데이트
    socket.on('message:new', (message) => {
      updateRoomLastMessage(message.roomId, message);
    });

    return () => {
      socket.off('message:new');
    };
  }, [isConnected, updateRoomLastMessage]);

  return <>{children}</>;
}