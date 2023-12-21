import { create } from 'zustand';

export interface ITimePicker {
  count: number;
}

export const useTimePicker = create<ITimePicker>(() => ({
  count: 0,
}));
