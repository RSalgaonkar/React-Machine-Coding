import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useState } from 'react';
import styles from './MutationsDashboard.module.css';

type Product = {
  id: number | string;
  title: string;
  price: number;
  category: string;
};

type CreateProductInput = Omit<Product, 'id'>;

type ProductsPage = {
  products: Product[];
  total: number;
  skip?: number;
  limit?: number;
};

type InfiniteProductsData = {
  pages: ProductsPage[];
  pageParams: unknown[];
};

type SyncStatus = {
  synced: boolean;
  lastSync: string;
};

export default function MutationsDashboard() {
  const queryClient = useQueryClient();

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    category: 'electronics',
  });

  const { data: syncStatus } = useQuery<SyncStatus>({
    queryKey: ['sync-status'],
    refetchInterval: 3000,
    queryFn: async () => ({
      synced: Math.random() > 0.2,
      lastSync: new Date().toLocaleTimeString(),
    }),
  });

  const createMutation = useMutation<
    Product,
    Error,
    CreateProductInput,
    { previousProductsQueries: [readonly unknown[], InfiniteProductsData | undefined][] }
  >({
    mutationFn: async (product) => {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return { id: Date.now(), ...product };
    },
    onMutate: async (newProductData) => {
      await queryClient.cancelQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      });

      const previousProductsQueries = queryClient.getQueriesData<InfiniteProductsData>({
        predicate: (query) => query.queryKey[0] === 'products',
      });

      const optimisticProduct: Product = {
        id: `temp-${Date.now()}`,
        ...newProductData,
      };

      queryClient.setQueriesData<InfiniteProductsData>(
        {
          predicate: (query) => query.queryKey[0] === 'products',
        },
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page, index) =>
              index === 0
                ? {
                    ...page,
                    products: [optimisticProduct, ...page.products],
                    total: (page.total || 0) + 1,
                  }
                : page
            ),
          };
        }
      );

      return { previousProductsQueries };
    },
    onError: (_err, _newProductData, context) => {
      context?.previousProductsQueries.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      });
      queryClient.invalidateQueries({
        queryKey: ['categories'],
      });
    },
  });

  const deleteMutation = useMutation<null, Error, number>({
    mutationFn: (id: number) =>
      new Promise<null>((resolve) => {
        void id;
        setTimeout(() => resolve(null), 800);
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === 'products',
      });
    },
  });

  const handleCreate = () => {
    if (!newProduct.title.trim() || !newProduct.price.trim()) return;

    createMutation.mutate({
      title: newProduct.title.trim(),
      price: Number(newProduct.price),
      category: newProduct.category,
    });

    setNewProduct({
      title: '',
      price: '',
      category: 'electronics',
    });
  };

  return (
    <div className={styles.dashboard}>
      <h3>⚡ Advanced Mutations + Background Sync</h3>

      <div className={styles.syncStatus}>
        <span>🕒 Last sync: {syncStatus?.lastSync}</span>
        <span>{syncStatus?.synced ? '✅ Synced' : '⚠️ Syncing...'}</span>
      </div>

      <div className={styles.form}>
        <input
          placeholder="Product name"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button
          onClick={handleCreate}
          disabled={createMutation.isPending}
          className="btn"
        >
          {createMutation.isPending ? '⏳ Creating...' : '✨ Create Product'}
        </button>
      </div>

      <div className={styles.mutationInfo}>
        <div>Create: {createMutation.status}</div>
        <div>
          Optimistic: {createMutation.isSuccess ? '✅ Confirmed' : '⏳ Pending'}
        </div>
      </div>
    </div>
  );
}