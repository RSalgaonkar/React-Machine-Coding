import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import CheckboxTreePage from './pages/CheckboxTreePage';
import CheckboxTreeDocsPage from './pages/CheckboxTreeDocsPage';
import TextStreamerPage from './pages/TextStreamerPage';
import AutoCompletePage from './pages/AutoCompletePage';
import CommentsPage from './pages/CommentsPage';
import TablePage from './pages/TablePage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'checkbox-tree', element: <CheckboxTreePage /> },
      { path: 'checkbox-tree-docs', element: <CheckboxTreeDocsPage /> },
      { path: 'text-streamer', element: <TextStreamerPage /> },
      { path: 'autocomplete', element: <AutoCompletePage /> },
      { path: 'comments', element: <CommentsPage /> },
      { path: 'table', element: <TablePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'checkout', element: <CheckoutPage /> },
    ],
  },
]);