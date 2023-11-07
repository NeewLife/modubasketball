import React from 'react';
import { Home, Main } from '@pages/index';

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
];
