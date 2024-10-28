export interface User {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: Date | null;
  image: string | null;
  hashedPassword: string | null;
  roomIds: string[];
  createdAt: Date;
  updatedAt: Date;
  status: string;
}