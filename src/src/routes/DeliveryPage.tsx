import React, { useState } from 'react';
import { DeliveryForm } from '@components/DeliveryForm';
import { DeliveryInfoDto, PaymentMethod } from '@types/domain';
import { deliveryApi } from '@api/deliveryApi';
import { useNavigate } from 'react-router-dom';

export const DeliveryPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: DeliveryInfoDto) => {
    setSubmitting(true);
    setError(null);
    try {
      await deliveryApi.createOrder(values);
      navigate('/');
    } catch (e) {
      setError('Не удалось оформить заказ. Попробуйте еще раз.');
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues: DeliveryInfoDto = {
    address: '',
    phone: '',
    email: '',
    paymentMethod: 'card' as PaymentMethod
  };

  return (
    <div className="page page-delivery">
      <h1>Доставка</h1>
      {error && <div className="form-error">{error}</div>}
      <DeliveryForm initialValues={initialValues} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
};

