import { create } from 'zustand';

export interface IResize {
    type?: 'desktop' | 'tablet' | 'mobile',
}

interface IUseResize extends IResize {
    setType: (width: number) => void;
}

export const useResize = create<IUseResize>((set) => ({
    setType: (width) => {
        let type : 'desktop' | 'tablet' | 'mobile' = 'tablet';
        if(width >= 1025) type = 'desktop';
        else if(width <= 480) type = "mobile";

        set(() => ({type}))
    }
}))