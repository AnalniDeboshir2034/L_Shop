import React from 'react';
import { ProductCategory, ProductQueryDto, SortOrder } from '@types/domain';

interface FiltersPanelProps {
  filters: ProductQueryDto;
  onSearchChange: (search: string) => void;
  onCategoryChange: (category?: ProductCategory) => void;
  onBrandChange: (brand?: string) => void;
  onAvailableChange: (available: boolean) => void;
  onSortOrderChange: (order?: SortOrder) => void;
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  filters,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onAvailableChange,
  onSortOrderChange
}) => {
  return (
    <div className="filters-panel">
      <input
        type="text"
        placeholder="Поиск по названию или описанию"
        value={filters.search ?? ''}
        onChange={(e) => onSearchChange(e.target.value)}
        className="filter-input"
      />
      <select
        value={filters.category ?? ''}
        onChange={(e) =>
          onCategoryChange(
            e.target.value === '' ? undefined : (e.target.value as ProductCategory)
          )
        }
        className="filter-select"
      >
        <option value="">Все категории</option>
        <option value="sneakers">Кроссовки</option>
        <option value="clothes">Одежда</option>
      </select>
      <input
        type="text"
        placeholder="Бренд"
        value={filters.brand ?? ''}
        onChange={(e) => onBrandChange(e.target.value || undefined)}
        className="filter-input"
      />
      <label className="filter-checkbox">
        <input
          type="checkbox"
          checked={filters.available ?? false}
          onChange={(e) => onAvailableChange(e.target.checked)}
        />
        Только в наличии
      </label>
      <select
        value={filters.sortOrder ?? ''}
        onChange={(e) =>
          onSortOrderChange(
            e.target.value === '' ? undefined : (e.target.value as SortOrder)
          )
        }
        className="filter-select"
      >
        <option value="">Без сортировки</option>
        <option value="asc">Цена по возрастанию</option>
        <option value="desc">Цена по убыванию</option>
      </select>
    </div>
  );
};

