import { NavLink, Outlet } from 'react-router-dom';
import styles from './components/layout/Layout.module.css';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/checkbox-tree', label: 'Checkbox Tree' },
  { to: '/text-streamer', label: 'Text Streamer' },
  { to: '/autocomplete', label: 'Auto Complete' },
  { to: '/nested-comments', label: 'Nested Comments' },
  { to: '/table', label: 'Table' },
  { to: '/products', label: 'Products' },
  { to: '/checkout', label: 'Checkout' },
  { to: '/playground', label: 'Playground' },
  { to: '/chat', label: 'Chat' },
  { to: '/collab-workspace', label: 'Collab Workspace' },
  { to: '/decision-lab', label: 'Decision Lab' },
];

export default function App() {
  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <h1 className={styles.logo}>React Machine Coding</h1>

        <nav className={styles.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}