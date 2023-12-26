import { create } from 'zustand';

export interface IUpdate {
  uMap: number;
  uDelete: number;
}

interface IUseUpdate extends IUpdate {
  setMap: () => void;
  setDelete: () => void;
}

export const useUpdate = create<IUseUpdate>((set, get) => ({
  uMap: 0,
  uDelete: 0,
  setMap: () => {
    const { uMap } = get();

    set(() => ({ uMap: uMap + 1 }));
  },
  setDelete: () => {
    const { uDelete } = get();

    set(() => ({ uDelete: uDelete + 1 }));
  },
}));
