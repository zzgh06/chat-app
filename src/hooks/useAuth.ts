import { useAuthStore } from "@/store/useAuthStore";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export const useAuth = () => {
  const { data: session, status } = useSession()
  const { user, setUser, logout } = useAuthStore();
  
  useEffect(() => {
    if (session?.user) {
      setUser({
        id: session.user.id,
        name: session.user.name || null,
        email: session.user.email || null,
        image: session.user.image || null,
        status: 'online',
        roomIds: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      logout();
    }
  }, [session, setUser, logout]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading: status === 'loading',
  };
};