export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  status: 'online' | 'offline';
  lastSeen: Date;
}

export interface ChatRoom {
  _id: string;
  name: string;
  type: 'direct' | 'group';
  participants: User[];
  createdAt: Date;
  lastMessage?: Message;
}

export interface Message {
  _id: string;
  roomId: string;
  sender: User;
  content: string;
  type: 'text' | 'file' | 'image';
  createdAt: Date;
  readBy: User[];
}