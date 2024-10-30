import { User } from ".";

export interface Message {
  id: string;
  content: string;
  fileUrl: string | null;
  roomId: string;
  senderId: string;
  sender: User;
  createdAt: Date;
  updatedAt: Date;
  seenIds: string[];
}

export interface MessagesResponse {
  messages: Message[];
  nextCursor: string | null;
}