import React, { MouseEvent } from 'react';
import { Caption, ImageProps, Title } from '@components/atoms';
import { ImageGroup } from '@components/molecules';

interface ImageFromProps {
  imageData?: ImageProps[];

  onFileAction?: () => void;

  onClickAction?: (event: MouseEvent<HTMLSpanElement>) => void;
}

export const ImageForm = (props: ImageFromProps) => {
  const { imageData = [], onFileAction = () => {}, onClickAction = () => {} } = props;

  return (
    <div>
      <div className="flex justify-between items-center mb-[22px]">
        <div>
          <Title className="desktop:hidden" type="mainSmall" text="사진" color="text-secondary-30" />
          <Title className="tablet:hidden mobile:hidden" type="main" text="사진" color="text-secondary-30" />
        </div>
        <div className="relative">
          <label htmlFor="file">
            <Caption className="cursor-pointer" text="사진 올리기" color="text-secondary-30" onClick={onClickAction} />
          </label>
          <input id="file" className="hidden" type="file" accept="image/*" multiple onChange={onFileAction} />
        </div>
      </div>
      <div>
        {imageData.length === 0 ? (
          <div className="desktop:h-[60px] h-[30px] flex items-center justify-center">
            <Title
              className="tablet:hidden mobile:hidden"
              type="sub"
              text="농구장 사진을 공유해주세요"
              color="text-gray-60"
            />
            <div className="flex flex-col desktop:hidden">
              <Caption className="text-center" text="아직 사진이 없어요!" color="text-gray-60" />
              <Caption text="농구장 사진을 공유해주세요." color="text-gray-60" />
            </div>
          </div>
        ) : (
          <ImageGroup data={imageData} />
        )}
      </div>
    </div>
  );
};
