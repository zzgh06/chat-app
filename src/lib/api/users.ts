interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  status: 'online' | 'offline';
}

export const fetchUser = async (userId: string): Promise<User> => {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};