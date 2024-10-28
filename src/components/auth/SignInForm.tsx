'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

interface FormData {
  email: string;
  password: string;
}

export const SignInForm = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '잘못된 이메일 형식입니다.';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError('');

      const result = await signIn('credentials', {
        ...formData,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid credentials');
        return;
      }

      router.push('/chat');
      router.refresh();
    } catch (error) {
      console.error(error)
      setError('문제가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async () => {
    try {
      setIsLoading(true);
      await signIn('google', { callbackUrl: '/chat' });
    } catch (error) {
      console.error(error)
      setError('Google 로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">로그인</h1>
        <p className="text-gray-600">계속하려면 계정에 로그인하세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email"
            disabled={isLoading}
            data-testid="email-input"
          />
          {errors.email && (
            <p className="text-sm text-red-500" data-testid="email-error">
              {errors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label 
            htmlFor="password" 
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your password"
            disabled={isLoading}
            data-testid="password-input"
          />
          {errors.password && (
            <p className="text-sm text-red-500" data-testid="password-error">
              {errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="submit"
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">
            계속하기
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSocialLogin}
        disabled={isLoading}
        className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        Google
      </button>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          계정이 없으신가요? {' '}
        </span>
        <button
          type="button"
          onClick={() => router.push('/auth/signup')}
          className="text-sm text-blue-600 hover:underline"
        >
          회원가입
        </button>
      </div>
    </div>
  );
};