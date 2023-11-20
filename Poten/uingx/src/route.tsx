import React from 'react';
import { Home, Main, AdminLogin, Admin } from '@pages/index';
import { PrivateRouter } from './PrivateRouter';

export const element = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'map',
        element: <Main />,
      },
    ],
  },
  {
    path: '/admin',
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: 'detail',
        element: (
          <PrivateRouter>
            <Admin />
          </PrivateRouter>
        ),
      },
      {
        path: '*',
        element: <AdminLogin />,
      },
    ],
  },
  {
    path: '*',
    element: <Home />,
  },
];
