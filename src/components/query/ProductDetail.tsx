import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { useEffect } from 'react';
import { api } from '../../lib/api';
import styles from './ProductDetail.module.css';
import { number } from 'framer-motion';

interface Props {
  productId: number;
}

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
};

type CategoriesResponse = string[];

type ProductsResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export default function ProductDetail({ productId }: Props) {
  const queryClient = useQueryClient();

  const { data: product, error, isFetching } = useSuspenseQuery<Product>({
    queryKey: ['product', productId],
    queryFn: () => api.getProduct(productId),
  });

  const { data: categories } = useQuery<CategoriesResponse>({
    queryKey: ['categories', product.category],
    queryFn: api.getCategories,
    enabled: !!product.category,
  });

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['product', productId + 1],
      queryFn: () => api.getProduct(productId + 1),
    });

    queryClient.prefetchInfiniteQuery<ProductsResponse, Error, ProductsResponse, string[], number>({
      queryKey: ['products', 'related', product.category],
      initialPageParam: 0,
      queryFn: ({ pageParam }) => api.getProducts({ pageParam }),
    });
  }, [productId, product.category, queryClient]);

  if (error && !isFetching) {
    throw error;
  }

  return (
    <div className={styles.detail}>
      <h3>{product.title}</h3>
      <p className={styles.price}>₹{product.price}</p>
      <p>{product.description}</p>

      <div className={styles.related}>
        <strong>Categories:</strong>{' '}
        {categories?.includes(product.category) ? '✅ Related' : '❌'}
      </div>

      <div className={styles.prefetchStatus}>
        🚀 Prefetched: Product #{productId + 1}, Related {product.category}
      </div>
    </div>
  );
}