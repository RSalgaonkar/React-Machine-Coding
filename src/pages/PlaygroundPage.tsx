import InfiniteProducts from '../components/query/InfiniteProducts'
import ProductDetail from '../components/query/ProductDetail'
import MutationsDashboard from '../components/query/MutationsDashboard'
import AutoComplete from '../components/autocomplete/AutoComplete'
import styles from '../components/playground/Playground.module.css'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function PlaygroundPage() {
  const [selectedProduct, setSelectedProduct] = useState(1)

  return (
    <section className="page">
      <motion.h2 className={styles.title}>
        🚀 TanStack Query Power Pack (2026 Production)
      </motion.h2>
      
      <div className={styles.grid}>
        {/* Autocomplete - Basic Queries */}
        <div className={styles.card}>
          <h3>🔍 Smart Autocomplete</h3>
          <AutoComplete />
        </div>

        {/* Infinite Scroll */}
        <div className={styles.card}>
          <h3>📜 Infinite Products</h3>
          <InfiniteProducts />
        </div>

        {/* Dependent Queries */}
        <div className={styles.card}>
          <h3>🔗 Product Detail + Prefetch</h3>
          <div>
            <button 
              onClick={() => setSelectedProduct(p => p === 1 ? 2 : 1)}
              className="btn"
            >
              Switch Product #{selectedProduct}
            </button>
            <ProductDetail productId={selectedProduct} />
          </div>
        </div>

        {/* Advanced Mutations */}
        <div className={styles.card}>
          <h3>⚡ Mutations Dashboard</h3>
          <MutationsDashboard />
        </div>
      </div>

      <div className={styles.features}>
        <h3>🏆 Enterprise Patterns:</h3>
        <div className={styles.featureList}>
          <div>🔥 Infinite Queries + Intersection Observer</div>
          <div>⚡ Advanced Optimistic Updates w/ Rollback</div>
          <div>🔗 Dependent Queries</div>
          <div>🚀 Prefetching + Background Sync</div>
          <div>📊 Targeted Query Invalidation</div>
          <div>⏱️ Stale Time + GC Time Optimization</div>
          <div>🔄 Real-time Background Refetching</div>
        </div>
      </div>

      <div style={{ 
        background: '#fef3c7', 
        padding: '20px', 
        borderRadius: '12px', 
        marginTop: '2rem',
        textAlign: 'center'
      }}>
        💡 Open <strong>React Query DevTools</strong> (bottom-right) to see 
        15+ active queries, cache, mutations, and timelines LIVE!
      </div>
    </section>
  )
}