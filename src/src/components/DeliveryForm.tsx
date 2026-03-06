import React, { useState } from 'react';
import { DeliveryInfoDto, PaymentMethod } from '@types/domain';

interface DeliveryFormProps {
  initialValues: DeliveryInfoDto;
  onSubmit: (values: DeliveryInfoDto) => void | Promise<void>;
  submitting: boolean;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  initialValues,
  onSubmit,
  submitting
}) => {
  const [values, setValues] = useState<DeliveryInfoDto>(initialValues);

  const handleChange =
    (field: keyof DeliveryInfoDto) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handlePaymentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const method = event.target.value as PaymentMethod;
    setValues((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    void onSubmit(values);
  };

  return (
    <form data-delivery className="form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Адрес</label>
        <input
          type="text"
          value={values.address}
          onChange={handleChange('address')}
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
        <label>Email</label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          required
        />
      </div>
      <div className="form-field">
        <label>Способ оплаты</label>
        <select
          value={values.paymentMethod}
          onChange={handlePaymentChange}
          className="filter-select"
        >
          <option value="card">Картой при получении</option>
          <option value="cash">Наличными</option>
          <option value="online">Онлайн-оплата</option>
        </select>
      </div>
      <button type="submit" className="btn primary" disabled={submitting}>
        Оформить заказ
      </button>
    </form>
  );
};

