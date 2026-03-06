import React, { useEffect, useState } from 'react';
import { basketApi } from '@api/basketApi';
import { BasketDto } from '@types/domain';
import { BasketItem } from '@components/BasketItem';
import { useNavigate } from 'react-router-dom';

export const BasketPage: React.FC = () => {
  const [basket, setBasket] = useState<BasketDto | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await basketApi.getBasket();
        setBasket(data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const handleQuantityChange = async (productId: string, quantity: number) => {
    const updated = await basketApi.updateItem(productId, quantity);
    setBasket(updated);
  };

  const handleRemove = async (productId: string) => {
    const updated = await basketApi.removeItem(productId);
    setBasket(updated);
  };

  const total = basket
    ? basket.items.reduce((sum, item) => {
        const product = basket.products.find((p) => p.id === item.productId);
        if (!product) {
          return sum;
        }
        return sum + product.price * item.quantity;
      }, 0)
    : 0;

  const handleGoToDelivery = () => {
    navigate('/delivery');
  };

  return (
    <div className="page page-basket">
      <h1>Корзина</h1>
      {loading && <div>Загрузка корзины...</div>}
      {!loading && basket && basket.items.length === 0 && <div>Корзина пуста</div>}
      {!loading && basket && basket.items.length > 0 && (
        <>
          <div className="basket-list">
            {basket.items.map((item) => {
              const product = basket.products.find((p) => p.id === item.productId);
              if (!product) {
                return null;
              }
              return (
                <BasketItem
                  key={item.productId}
                  product={product}
                  quantity={item.quantity}
                  onQuantityChange={(qty) => handleQuantityChange(item.productId, qty)}
                  onRemove={() => handleRemove(item.productId)}
                />
              );
            })}
          </div>
          <div className="basket-summary">
            <div className="basket-total">Итого: {total} ₽</div>
            <button type="button" className="btn primary" onClick={handleGoToDelivery}>
              Оформить доставку
            </button>
          </div>
        </>
      )}
    </div>
  );
};

