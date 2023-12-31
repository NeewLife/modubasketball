import React from 'react';
import Modal from 'react-modal';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

Modal.setAppElement('#root');
const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
  <HashRouter>
    <App />
  </HashRouter>,
);
