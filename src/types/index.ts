import { Message, Room, User } from '@prisma/client'

export type MessageWithUser = Message & {
  user: User
}

export type RoomWithUsers = Room & {
  users: User[]
  messages: MessageWithUser[]
}