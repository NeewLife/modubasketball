import { useEffect } from 'react';

export const useCustomBack = (customBack: () => void) => {
  useEffect(() => {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', customBack);

    return () => {
      window.removeEventListener('popstate', customBack);
    };
  }, [customBack]);
};
