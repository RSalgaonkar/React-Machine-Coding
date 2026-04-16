import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/checkbox-tree', label: 'Checkbox Tree' },
  { to: '/text-streamer', label: 'Text Streamer' },
  { to: '/autocomplete', label: 'Auto Complete' },
  { to: '/comments', label: 'Nested Comments' },
  { to: '/table', label: 'Table' },
  { to: '/products', label: 'Products' },
  { to: '/checkout', label: 'Checkout' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="grid min-h-screen md:grid-cols-[280px_1fr]">
        <aside className="border-b border-slate-200 bg-white p-6 md:border-b-0 md:border-r">
          <h1 className="text-2xl font-bold text-slate-900">React Machine Coding</h1>
          <p className="mt-2 text-sm text-slate-600">
            Production-ready Vite + React + TypeScript + Tailwind SPA
          </p>

          <nav className="mt-6 flex flex-col gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-sm font-medium transition',
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 hover:bg-slate-100'
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}