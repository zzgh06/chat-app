import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface ChatStore {
  activeRoomId: string | null;
  messageMap: Record<string, any[]>;
  unreadCount: Record<string, number>;
  actions: {
    setActiveRoom: (roomId: string) => void;
    addMessage: (roomId: string, message: any) => void;
    setUnreadCount: (roomId: string, count: number) => void;
  };
}

export const useChatStore = create<ChatStore>()(
  devtools(
    persist(
      (set) => ({
        activeRoomId: null,
        messageMap: {},
        unreadCount: {},
        actions: {
          setActiveRoom: (roomId) => 
            set({ activeRoomId: roomId }),
          addMessage: (roomId, message) =>
            set((state) => ({
              messageMap: {
                ...state.messageMap,
                [roomId]: [...(state.messageMap[roomId] || []), message],
              },
            })),
          setUnreadCount: (roomId, count) =>
            set((state) => ({
              unreadCount: {
                ...state.unreadCount,
                [roomId]: count,
              },
            })),
        },
      }),
      {
        name: 'chat-store',
      }
    )
  )
);