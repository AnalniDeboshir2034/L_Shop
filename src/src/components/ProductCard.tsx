import React, { useState } from 'react';
import { ProductDto } from '@types/domain';

interface ProductCardProps {
  product: ProductDto;
  onAddToBasket: (productId: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToBasket }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAdd = () => {
    onAddToBasket(product.id, quantity);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (Number.isNaN(value) || value <= 0) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-placeholder" />
      <div className="product-info">
        <h3 data-title={product.title} className="product-title">
          {product.title}
        </h3>
        <div data-price={product.price} className="product-price">
          {product.price} ₽
        </div>
        <div className="product-meta">
          <span>{product.brand}</span>
          <span>{product.category === 'sneakers' ? 'Кроссовки' : 'Одежда'}</span>
        </div>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={handleQuantityChange}
            className="quantity-input"
          />
          <button
            type="button"
            className="btn primary"
            onClick={handleAdd}
            disabled={!product.available}
          >
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
};

