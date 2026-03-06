import React, { useState } from 'react';
import { RegistrationForm } from '@components/RegistrationForm';
import { LoginForm } from '@components/LoginForm';
import { RegisterRequestDto, LoginRequestDto } from '@types/domain';
import { authApi } from '@api/authApi';
import { useAuth } from '@store/AuthContext';
import { useNavigate } from 'react-router-dom';

type AuthMode = 'login' | 'register';

export const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (values: RegisterRequestDto) => {
    setSubmitting(true);
    setError(null);
    try {
      const user = await authApi.register(values);
      login(user);
      navigate('/');
    } catch {
      setError('Не удалось зарегистрироваться. Проверьте данные и попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async (values: LoginRequestDto) => {
    setSubmitting(true);
    setError(null);
    try {
      const user = await authApi.login(values);
      login(user);
      navigate('/');
    } catch {
      setError('Неверный логин или пароль.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page-auth">
      <div className="auth-toggle">
        <button
          type="button"
          className={mode === 'login' ? 'btn tab active' : 'btn tab'}
          onClick={() => setMode('login')}
        >
          Вход
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'btn tab active' : 'btn tab'}
          onClick={() => setMode('register')}
        >
          Регистрация
        </button>
      </div>
      {error && <div className="form-error">{error}</div>}
      {mode === 'login' ? (
        <LoginForm onSubmit={handleLogin} submitting={submitting} />
      ) : (
        <RegistrationForm onSubmit={handleRegister} submitting={submitting} />
      )}
    </div>
  );
};

