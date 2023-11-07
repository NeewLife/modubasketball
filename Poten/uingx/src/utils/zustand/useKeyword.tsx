import { create } from 'zustand';

export interface IKeyword {
  type: 'search' | 'gps';
  keyword: string;
}

interface IUseKeyword extends IKeyword {
  setType: (props: IKeyword) => void;
}

export const useKeyword = create<IUseKeyword>((set) => ({
  type: 'gps',
  keyword: '',
  setType: (props) => {
    set(() => ({ type: props.type, keyword: props.keyword }));
  },
}));
