// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RouterProvider } from 'react-router-dom';
// import { router } from './router';
// import './index.css';
// import { CartProvider } from './context/CartContext';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <CartProvider>
//       <RouterProvider router={router} />
//     </CartProvider>
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { router } from './router';
import { store } from './app/store';
import './index.css';
import { CartProvider } from './context/CartContext';
import { QueryProvider } from './lib/QueryProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </QueryProvider>
    </Provider>
  </React.StrictMode>
);