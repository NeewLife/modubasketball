import React from 'react';

import { CustomModal } from '@components/molecules';
import { useRoutes } from 'react-router-dom';
import { element } from './route';

import './index.css';

export const App = () => {
  const routes = useRoutes(element);

  return (
    <>
      <div>
        <CustomModal />
      </div>
      {routes}
    </>
  );
};
