import React, { useEffect, useState } from 'react';
import { Caption } from '@components/atoms';

export interface ImageProps {
  url: string;
  alt?: string;

  onClickDelete?: () => void;
  onClickImage?: (sBlob: Blob) => () => void;
}

export const Image = (props: ImageProps) => {
  const { url, alt = '', onClickImage = () => () => {}, onClickDelete } = props;

  const [blob, setBlob] = useState<Blob>(new Blob());

  useEffect(() => {
    fetch(url).then((response) => {
      response.blob().then((sBlob) => {
        setBlob(sBlob);
      });
    });
  }, []);

  return (
    <div className="flex flex-col gap-[4px] desktop:w-[200px] w-[140px]">
      <div
        style={{ backgroundImage: `url(${URL.createObjectURL(blob)})` }}
        className="w-full desktop:h-[200px] h-[140px] rounded-[5px] bg-center relative inset-0 cursor-zoom-in"
        onClick={onClickImage(blob)}
        role="presentation"
      />
      <div className="flex items-start desktop:justify-between tablet:justify-start mobile:justify-start tablet:flex-col mobile:flex-col tablet:gap-[4px] mobile:gap-[4px]">
        <Caption text={alt} color="text-gray-60" />
        {onClickDelete && (
          <Caption className="cursor-pointer" text="삭제" color="text-brand-30" onClick={onClickDelete} />
        )}
      </div>
    </div>
  );
};
