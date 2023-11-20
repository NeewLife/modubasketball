import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';

import { CustomModal } from '@components/molecules';
import { useRoutes } from 'react-router-dom';
import { useResize } from '@utils/zustand';
import { element } from './route';

import './index.css';

export const App = () => {
  const routes = useRoutes(element);
  const { setType } = useResize();

  useEffect(() => {
    setType(window.innerWidth);
    window.addEventListener('resize', () => {
      setType(window.innerWidth);
    });
  }, []);
  return (
    <CookiesProvider>
      <div>
        <CustomModal />
      </div>
      {routes}
    </CookiesProvider>
  );
};
