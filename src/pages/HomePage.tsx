import { Link } from 'react-router-dom';

const features = [
  { label: 'Checkbox Tree', path: '/checkbox-tree' },
  { label: 'Text Streamer', path: '/text-streamer' },
  { label: 'Auto Complete', path: '/autocomplete' },
  { label: 'Nested Comments', path: '/nested-comments' },
  { label: 'Sortable Table', path: '/table' },
  { label: 'Products', path: '/products' },
  { label: 'Checkout', path: '/checkout' },
];

export default function HomePage() {
  return (
    <section className="page">
      <h2>Machine Coding Dashboard</h2>
      <p>Navigate to each feature page and review the implementation independently.</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            style={{
              padding: '16px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#222',
              background: '#fff',
            }}
          >
            {feature.label}
          </Link>
        ))}
      </div>
    </section>
  );
}