// @ts-nocheck
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePage from './pages/HomePage.jsx';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import LatestMoviesPage from './pages/LatestMoviesPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NavBar />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/profile',
        element: <h1>Profile</h1>,
      },
      {
        path: '/latest-movies',
        element: <LatestMoviesPage />,
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
