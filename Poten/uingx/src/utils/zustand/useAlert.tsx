import { create } from 'zustand';

type AlertType = 'success' | 'info' | 'warning' | 'error';

interface IAlert {
  count: number;
  type: AlertType;
  message: string;
}

interface IUseAlert extends IAlert {
  setOpen: (type: AlertType, message: string) => void;
}

export const useAlert = create<IUseAlert>((set, get) => ({
  count: 0,
  type: 'success',
  message: '',

  setOpen: (type, message) => {
    const { count } = get();

    set(() => ({ count: count + 1, type, message }));
  },
}));
