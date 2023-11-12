import React, { useEffect } from 'react';

import { CustomModal } from '@components/molecules';
import { useRoutes } from 'react-router-dom';
import ReactGA from 'react-ga';
import { element } from './route';

import './index.css';

export const App = () => {
  const routes = useRoutes(element);

  useEffect(() => {
    ReactGA.initialize('G-V9MX2W1FNX');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <>
      <div>
        <CustomModal />
      </div>
      {routes}
    </>
  );
};
