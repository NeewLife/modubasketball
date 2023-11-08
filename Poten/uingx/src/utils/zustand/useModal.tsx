import React from 'react';
import { create } from 'zustand';

export interface IModal {
  open: boolean;
  children?: JSX.Element;
}

interface IUseModal extends IModal {
  setOpen: (children: JSX.Element) => void;
  setClose: () => void;
}

export const useModal = create<IUseModal>((set) => ({
  open: false,
  setOpen: (children) => {
    set(() => ({ open: true, children: children }));
  },
  setClose: () => {
    set(() => ({ open: false, children: <div /> }));
  },
}));
