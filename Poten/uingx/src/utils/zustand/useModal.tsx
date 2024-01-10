import React from 'react';
import { create } from 'zustand';

export interface IModal {
  open: boolean;
  children?: JSX.Element;

  change: boolean;
  changeChildren: JSX.Element;
  timeout: boolean;

  width: string;
  height: boolean;

  close: boolean;
  edit?: {
    icon: string;
    onClick: () => void;
  };

  isModile: boolean;
}

interface IUseModal extends IModal {
  setOpen: (children: JSX.Element) => void;
  setClose: () => void;
}

export const useModal = create<IUseModal>((set) => ({
  open: false,
  change: false,
  timeout: true,
  changeChildren: <div />,
  close: true,
  width: 'auto',
  height: true,
  isModile: false,
  setOpen: (children) => {
    window.history.pushState(null, '', window.location.href);
    set(() => ({ open: true, children: children }));
  },
  setClose: () => {
    set(() => ({ open: false, children: <div /> }));
  },
}));
