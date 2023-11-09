import { create } from 'zustand';

export interface IUpdate {
  uMap: number;
}

interface IUseUpdate extends IUpdate {
  setMap: () => void;
}

export const useUpdate = create<IUseUpdate>((set, get) => ({
  uMap: 0,
  setMap: () => {
    const { uMap } = get();

    set(() => ({ uMap: uMap + 1 }));
  },
}));
