import { User } from ".";

export interface Message {
  id: string;
  content: string;
  senderId: string;
  sender: User;
  roomId: string;
  createdAt: string;
  seenIds: string[];
}

export interface Room {
  id: string;
  name: string | null;
  isGroup: boolean;
  users: User[];
  lastMessage?: Message | null;
  createdAt: string;
  updatedAt: string;
}