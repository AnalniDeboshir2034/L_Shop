import React, { useEffect, useState } from 'react';
import { productsApi } from '@api/productsApi';
import { basketApi } from '@api/basketApi';
import { ProductDto, ProductCategory, ProductQueryDto } from '@types/domain';
import { useAuth } from '@store/AuthContext';
import { ProductCard } from '@components/ProductCard';
import { FiltersPanel } from '@components/FiltersPanel';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ProductQueryDto>({});
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await productsApi.list(filters);
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, [filters]);

  const handleCategoryChange = (category?: ProductCategory) => {
    setFilters((prev) => ({ ...prev, category }));
  };

  const handleSearchChange = (search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  };

  const handleBrandChange = (brand?: string) => {
    setFilters((prev) => ({ ...prev, brand }));
  };

  const handleAvailableChange = (available: boolean) => {
    setFilters((prev) => ({ ...prev, available }));
  };

  const handleSortOrderChange = (sortOrder?: 'asc' | 'desc') => {
    if (sortOrder) {
      setFilters((prev) => ({ ...prev, sortBy: 'price', sortOrder }));
    } else {
      setFilters((prev) => ({ ...prev, sortBy: undefined, sortOrder: undefined }));
    }
  };

  const handleAddToBasket = async (productId: string, quantity: number) => {
    if (!isAuthenticated) {
      window.location.href = '/auth';
      return;
    }
    await basketApi.addItem({ productId, quantity });
  };

  return (
    <div className="page page-home">
      <FiltersPanel
        filters={filters}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onBrandChange={handleBrandChange}
        onAvailableChange={handleAvailableChange}
        onSortOrderChange={handleSortOrderChange}
      />
      <div className="products-grid">
        {loading && <div>Загрузка товаров...</div>}
        {!loading &&
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToBasket={handleAddToBasket}
            />
          ))}
      </div>
    </div>
  );
};

