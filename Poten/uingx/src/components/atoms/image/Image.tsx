import React from 'react';
import { Caption } from '@components/atoms';

import ImgClose from '@constants/icon/imgClose.svg';

export interface ImageProps {
  url: string;
  alt?: string;

  onClick?: () => void;
}

export const Image = (props: ImageProps) => {
  const { url, alt = '', onClick } = props;

  return (
    <div className="flex flex-col gap-[4px] relative">
      <div
        style={{ backgroundImage: `url('${url}')` }}
        className="desktop:w-[200px] w-[140px] desktop:h-[200px] h-[140px] rounded-[5px] bg-center relative inset-0"
      >
        {onClick && (
          <img className="absolute top-0 right-0 cursor-pointer" alt="imgClose" src={ImgClose} onClick={onClick} />
        )}
      </div>
      <Caption text={alt} color="text-gray-60" />
    </div>
  );
};
