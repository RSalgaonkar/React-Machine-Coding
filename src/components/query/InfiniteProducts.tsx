import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { api, Product } from '../../lib/api'
import styles from './InfiniteProducts.module.css'

export default function InfiniteProducts() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    error,
  } = useInfiniteQuery({
    queryKey: ['products', 'infinite'],
    queryFn: api.getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      // Return next cursor or false if no more pages
      return lastPage.skip + lastPage.limit < lastPage.total 
        ? lastPage.skip / lastPage.limit 
        : undefined
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const { ref, inView } = useInView({
    threshold: 0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
  })

  const products = data?.pages.flatMap(page => page.products) ?? []

  return (
    <div className={styles.container}>
      <h3>🛍️ Infinite Products (60+ items)</h3>
      
      <div className={styles.stats}>
        <span>Total: {data?.pages[0]?.total ?? 0} products</span>
        <span>Loaded: {products.length}</span>
        <span>{isFetchingNextPage ? '⏳ Loading...' : '✅'}</span>
      </div>

      <div className={styles.grid}>
        {products.map((product: Product) => (
          <motion.div
            key={product.id}
            className={styles.card}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            layout
          >
            <h4>{product.title}</h4>
            <p className={styles.price}>₹{product.price}</p>
            <span className={styles.category}>{product.category}</span>
          </motion.div>
        ))}
      </div>

      {error && <div className={styles.error}>Error: {error.message}</div>}

      <div ref={ref} className={styles.sentinel}>
        {hasNextPage ? (
          isFetchingNextPage ? (
            <div>🔄 Loading more products...</div>
          ) : (
            <div>📜 Scroll for more</div>
          )
        ) : (
          <div>🎉 All products loaded!</div>
        )}
      </div>
    </div>
  )
}