import type { ProductCategory, ProductSortBy } from '../types';
import styles from './Products.module.css';

interface Props {
  categories: ('All' | ProductCategory)[];
  selectedCategory: 'All' | ProductCategory;
  search: string;
  sortBy: ProductSortBy;
  onSearch: (value: string) => void;
  onCategory: (value: 'All' | ProductCategory) => void;
  onSort: (value: ProductSortBy) => void;
}

export default function ProductFilters({
  categories,
  selectedCategory,
  search,
  sortBy,
  onSearch,
  onCategory,
  onSort,
}: Props) {
  return (
    <div className={styles.filters}>
      <input
        className={styles.searchInput}
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by title, brand, or tag"
        aria-label="Search products"
      />

      <select
        className={styles.select}
        value={selectedCategory}
        onChange={(e) => onCategory(e.target.value as 'All' | ProductCategory)}
        aria-label="Filter by category"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        className={styles.select}
        value={sortBy}
        onChange={(e) => onSort(e.target.value as ProductSortBy)}
        aria-label="Sort products"
      >
        <option value="featured">Featured</option>
        <option value="price-low-high">Price: Low to High</option>
        <option value="price-high-low">Price: High to Low</option>
        <option value="rating-high">Top Rated</option>
        <option value="name-asc">Name A-Z</option>
      </select>
    </div>
  );
}