'use client';

import { useSignUp } from "@/hooks/useSignUp";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function SignUpForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();
  const { signUp, error, isLoading } = useSignUp();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name) {
      newErrors.name = '이름은 필수입니다.';
    }

    if (!formData.email) {
      newErrors.email = '이메일은 필수입니다';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '잘못된 이메일 형식입니다';
    }

    if (!formData.password) {
      newErrors.password = '패스워드는 필수입니다';
    } else if (formData.password.length < 6) {
      newErrors.password = '비밀번호는 6자 이상이어야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await signUp(formData);
    } catch (error) {
      console.error('SignUp Error:', error);    
    } 
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">회원가입</h1>
        <p className="text-gray-600">
          서비스를 시작하려면 계정을 만들어주세요.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div
            className="p-3 text-sm text-red-500 bg-red-50 rounded-md"
            data-testid="form-error"
          >
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="이름을 입력해주세요"
            disabled={isLoading}
            data-testid="name-input"
          />
          {errors.name && (
            <p className="text-sm text-red-500" data-testid="name-error">
              {errors.name}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="이메일을 입력해주세요"
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
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md outline-none focus:ring-2 ${errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="비밀번호를 입력해주세요"
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
          {isLoading ? '계정 생성 중' : '회원가입'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
        </span>
        <button
          type="button"
          onClick={() => router.push('/sign-in')}
          className="text-sm text-blue-600 hover:underline"
        >
          로그인
        </button>
      </div>
    </div>
  )
}