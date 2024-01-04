import React from 'react';
import { Caption } from '@components/atoms';

export interface ImageProps {
  url: string;
  alt?: string;
}

export const Image = (props: ImageProps) => {
  const { url, alt = '' } = props;

  return (
    <div className="flex flex-col gap-[4px]">
      <div
        style={{ backgroundImage: `url('${url}')` }}
        className="desktop:w-[200px] w-[140px] desktop:h-[200px] h-[140px] rounded-[5px] bg-center"
      />
      <Caption text={alt} color="text-gray-60" />
    </div>
  );
};
