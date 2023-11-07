import './index.css';
import { useRoutes } from 'react-router-dom';
import { element } from './route';

export const App = () => {
  const routes = useRoutes(element);

  return routes;
};
