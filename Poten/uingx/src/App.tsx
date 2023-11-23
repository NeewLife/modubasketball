import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';

import { CustomModal } from '@components/molecules';
import { useRoutes } from 'react-router-dom';
import { useModal, useResize } from '@utils/zustand';
import { element } from './route';

import './index.css';

export const App = () => {
  const routes = useRoutes(element);

  const { setType } = useResize();
  const { open, setClose } = useModal();

  const onPopState = () => {
    if (open) {
      setClose();
      window.history.go(1);
    }
  };

  useEffect(() => {
    setType(window.innerWidth);
    window.addEventListener('resize', () => {
      setType(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [open]);

  return (
    <CookiesProvider>
      <div>
        <CustomModal />
      </div>
      {routes}
    </CookiesProvider>
  );
};
