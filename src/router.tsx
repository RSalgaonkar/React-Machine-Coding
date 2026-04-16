// import { createBrowserRouter } from 'react-router-dom';
// import App from './App';
// import HomePage from './pages/HomePage';
// import CheckboxTreePage from './pages/CheckboxTreePage';
// import TextStreamerPage from './pages/TextStreamerPage';
// import AutoCompletePage from './pages/AutoCompletePage';
// import NestedCommentsPage from './pages/NestedCommentsPage';
// import TablePage from './pages/TablePage';
// import ProductsPage from './pages/ProductsPage';
// import CheckoutPage from './pages/CheckoutPage';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: 'checkbox-tree', element: <CheckboxTreePage /> },
//       { path: 'text-streamer', element: <TextStreamerPage /> },
//       { path: 'autocomplete', element: <AutoCompletePage /> },
//       { path: 'nested-comments', element: <NestedCommentsPage /> },
//       { path: 'table', element: <TablePage /> },
//       { path: 'products', element: <ProductsPage /> },
//       { path: 'checkout', element: <CheckoutPage /> },
//     ],
//   },
// ]);

import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import CheckboxTreePage from './pages/CheckboxTreePage';
import TextStreamerPage from './pages/TextStreamerPage';
import AutoCompletePage from './pages/AutoCompletePage';
import NestedCommentsPage from './pages/NestedCommentsPage';
import TablePage from './pages/TablePage';
import ProductsShowcasePage from './features/products/pages/ProductsShowcasePage';
import CheckoutAdvancedPage from './features/products/pages/CheckoutAdvancedPage';
import OrderHistoryPage from './features/products/pages/OrderHistoryPage';
import PlaygroundPage from './pages/PlaygroundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'checkbox-tree', element: <CheckboxTreePage /> },
      { path: 'text-streamer', element: <TextStreamerPage /> },
      { path: 'autocomplete', element: <AutoCompletePage /> },
      { path: 'nested-comments', element: <NestedCommentsPage /> },
      { path: 'table', element: <TablePage /> },
      { path: 'products', element: <ProductsShowcasePage /> },
      { path: 'checkout', element: <CheckoutAdvancedPage /> },
      { path: 'orders', element: <OrderHistoryPage /> },
      { path: 'playground', element: <PlaygroundPage /> },
    ],
  },
]);