import type { Product, ProductCategory, ProductSortBy } from '../types';

export const getCategories = (products: Product[]): ('All' | ProductCategory)[] => {
  const categories = new Set(products.map((product) => product.category));
  return ['All', ...Array.from(categories)];
};

export const filterProducts = ({
  products,
  search,
  selectedCategory,
}: {
  products: Product[];
  search: string;
  selectedCategory: 'All' | ProductCategory;
}) => {
  const normalized = search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesSearch =
      !normalized ||
      product.title.toLowerCase().includes(normalized) ||
      product.brand.toLowerCase().includes(normalized) ||
      product.tags.some((tag) => tag.toLowerCase().includes(normalized));

    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });
};

export const sortProducts = (products: Product[], sortBy: ProductSortBy) => {
  const cloned = [...products];

  switch (sortBy) {
    case 'price-low-high':
      return cloned.sort((a, b) => a.price - b.price);
    case 'price-high-low':
      return cloned.sort((a, b) => b.price - a.price);
    case 'rating-high':
      return cloned.sort((a, b) => b.rating - a.rating);
    case 'name-asc':
      return cloned.sort((a, b) => a.title.localeCompare(b.title));
    case 'featured':
    default:
      return cloned.sort((a, b) => Number(Boolean(b.isTrending)) - Number(Boolean(a.isTrending)));
  }
};