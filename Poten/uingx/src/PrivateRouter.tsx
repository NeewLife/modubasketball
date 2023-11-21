import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouterProps {
  children: JSX.Element;
}

export const PrivateRouter = (props: PrivateRouterProps) => {
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('admin')) navigate('/admin');
  }, []);

  return children;
};
