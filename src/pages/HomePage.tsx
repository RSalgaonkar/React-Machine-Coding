import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';

const features = [
  { label: 'Checkbox Tree', path: '/checkbox-tree' },
  { label: 'Text Streamer', path: '/text-streamer' },
  { label: 'Auto Complete', path: '/autocomplete' },
  { label: 'Nested Comments', path: '/comments' },
  { label: 'Table', path: '/table' },
  { label: 'Products', path: '/products' },
  { label: 'Checkout', path: '/checkout' },
];

export default function HomePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Machine Coding Dashboard"
        description="A production-ready React + TypeScript + Tailwind application with reusable hooks, structured components, and tested utility logic."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {features.map((feature) => (
          <Link key={feature.path} to={feature.path}>
            <Card className="h-full transition hover:-translate-y-0.5 hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{feature.label}</h3>
              <p className="mt-2 text-sm text-slate-600">Open feature page</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}