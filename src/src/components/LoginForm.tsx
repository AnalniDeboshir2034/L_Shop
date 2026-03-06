import React, { useState } from 'react';
import { LoginRequestDto } from '@types/domain';

interface LoginFormProps {
  onSubmit: (values: LoginRequestDto) => void | Promise<void>;
  submitting: boolean;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, submitting }) => {
  const [values, setValues] = useState<LoginRequestDto>({
    loginOrEmail: '',
    password: ''
  });

  const handleChange = (field: keyof LoginRequestDto) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void onSubmit(values);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Email или логин</label>
        <input
          type="text"
          value={values.loginOrEmail}
          onChange={handleChange('loginOrEmail')}
          required
        />
      </div>
      <div className="form-field">
        <label>Пароль</label>
        <input
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          required
        />
      </div>
      <button type="submit" className="btn primary" disabled={submitting}>
        Войти
      </button>
    </form>
  );
};

