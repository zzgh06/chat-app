import { Message } from '@/types/room';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ServerToClientEvents {
  'message:new': (message: Message) => void;
  'user:status': (update: { userId: string; status: 'online' | 'offline' }) => void;
  connect: () => void;
  disconnect: () => void;
  'connect_error': (error: Error) => void;
  'reconnect_attempt': (attemptNumber: number) => void;
}

interface ClientToServerEvents {
  'room:join': (roomId: string) => void;
  'room:leave': (roomId: string) => void;
  'message:read': (messageId: string) => void;
}

// 소켓 인스턴스 생성
export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', 
  {
    autoConnect: false,
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
  }
);

// 소켓 연결 함수
export const connectSocket = (userId: string) => {
  if (!socket.connected) {
    socket.auth = { userId };
    socket.connect();
  }
};

// 소켓 연결 해제 함수
export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

// 에러 핸들링
socket.on('connect_error', (error) => {
  console.error('Socket connection error:', error);
});

// 재연결 시도 로깅
socket.on('reconnect_attempt', (attemptNumber) => {
  console.log(`Socket reconnection attempt #${attemptNumber}`);
});

// 소켓 상태 관리를 위한 커스텀 훅
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return {
    socket,
    isConnected,
    connect: connectSocket,
    disconnect: disconnectSocket,
  };
};