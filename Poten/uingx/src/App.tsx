/* eslint-disable react/no-children-prop */
import React, { useEffect, useRef } from 'react';
import { CookiesProvider } from 'react-cookie';
import { AddAlert, AnimateAlert } from '@byoungyoon/by-asset';

import { CustomModal } from '@components/molecules';
import { useRoutes } from 'react-router-dom';
import { useModal, useResize, useAlert } from '@utils/zustand';
import { element } from './route';

import './index.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const App = () => {
  const routes = useRoutes(element);

  const alertRef = useRef<null | AddAlert>(null);
  const { count, type, message } = useAlert();

  const { setType } = useResize();
  const { open, setClose } = useModal();

  const onPopState = () => {
    if (open) {
      setClose();
      window.history.go(1);
    }
  };

  const onAlertAction = (add: AddAlert) => {
    alertRef.current = add;
  };

  useEffect(() => {
    if (count !== 0) alertRef.current?.(type, message);
  }, [count]);

  useEffect(() => {
    window.addEventListener('popstate', onPopState);

    return () => {
      window.removeEventListener('popstate', onPopState);
    };
  }, [open]);

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
        <AnimateAlert children={onAlertAction} />
      </div>
      {routes}
    </CookiesProvider>
  );
};
