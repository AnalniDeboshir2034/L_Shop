import React, { useState } from 'react';
import { RegisterRequestDto } from '@types/domain';

interface RegistrationFormProps {
  onSubmit: (values: RegisterRequestDto) => void | Promise<void>;
  submitting: boolean;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSubmit,
  submitting
}) => {
  const [values, setValues] = useState<RegisterRequestDto>({
    name: '',
    email: '',
    login: '',
    phone: '',
    password: ''
  });

  const handleChange = (field: keyof RegisterRequestDto) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void onSubmit(values);
  };

  return (
    <form data-registration className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Имя</label>
        <input
          type="text"
          value={values.name}
          onChange={handleChange('name')}
          required
        />
      </div>
      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          required
        />
      </div>
      <div className="form-field">
        <label>Логин</label>
        <input
          type="text"
          value={values.login}
          onChange={handleChange('login')}
          required
        />
      </div>
      <div className="form-field">
        <label>Телефон</label>
        <input
          type="tel"
          value={values.phone}
          onChange={handleChange('phone')}
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
        Зарегистрироваться
      </button>
    </form>
  );
};

