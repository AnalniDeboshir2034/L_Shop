import React from 'react';
import { ProductDto } from '@types/domain';

interface BasketItemProps {
  product: ProductDto;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export const BasketItem: React.FC<BasketItemProps> = ({
  product,
  quantity,
  onQuantityChange,
  onRemove
}) => {
  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value) || value <= 0) {
      onQuantityChange(1);
    } else {
      onQuantityChange(value);
    }
  };

  return (
    <div className="basket-item">
      <div className="basket-item-info">
        <div data-title="basket" className="basket-item-title">
          {product.title}
        </div>
        <div data-price="basket" className="basket-item-price">
          {product.price} ₽
        </div>
      </div>
      <div className="basket-item-controls">
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={handleQuantityChange}
          className="quantity-input"
        />
        <button type="button" className="btn secondary" onClick={onRemove}>
          Удалить
        </button>
      </div>
    </div>
  );
};

