import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

interface UseSignUpReturn {
  signUp: (data: SignUpData) => Promise<void>;
  error: string;
  isLoading: boolean;
}

export const useSignUp = (): UseSignUpReturn => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const signUp = async (data: SignUpData) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Something went wrong');
      }

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error('Failed to sign in');
      }

      router.push('/');
      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Something went wrong');
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, error, isLoading };
};