import { create } from 'zustand';

export interface ITimePicker {
  target: string;
}

interface IUseTimePicker extends ITimePicker {
  setTarget: (target: string) => void;
}

export const useTimePicker = create<IUseTimePicker>((set) => ({
  target: '',
  setTarget: (target: string) => {
    set(() => ({ target }));
  },
}));
