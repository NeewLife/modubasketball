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
    <div className="flex flex-col gap-[4px]">
      <div
        style={{ backgroundImage: `url(${URL.createObjectURL(blob)})` }}
        className="desktop:w-[200px] w-[140px] desktop:h-[200px] h-[140px] rounded-[5px] bg-center relative inset-0 cursor-zoom-in"
        onClick={onClickImage(blob)}
        role="presentation"
      >
        {/* {onClick && (
          <img
          className="absolute top-[-20px] right-[-20px] cursor-pointer"
          width={40}
          height={40}
          alt="imgClose"
          src={ImgClose}
          onClick={onClick}
          />
        )} */}
      </div>
      <div className="flex items-center justify-between">
        <Caption text={alt} color="text-gray-60" />
        {onClickDelete && <Caption text="삭제" color="text-brand-30" />}
      </div>
    </div>
  );
};
