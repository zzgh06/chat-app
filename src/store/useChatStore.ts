import { create } from 'zustand'
import { Message } from '@prisma/client'

interface ChatStore {
  messages: Message[]
  currentRoom: string | null
  setCurrentRoom: (roomId: string) => void
  addMessage: (message: Message) => void
  setMessages: (messages: Message[]) => void
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  currentRoom: null,
  setCurrentRoom: (roomId) => set({ currentRoom: roomId }),
  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  setMessages: (messages) => set({ messages }),
}))