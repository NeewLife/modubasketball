import React from 'react';

import Save from '@constants/icon/save.svg';
import { Body, Headline } from '@components/atoms';

interface InfoSuccessProps {
  type: 'update' | 'save';
}

export const InfoSuccess = (props: InfoSuccessProps) => {
  const { type } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="save" src={Save} />
      <div className="mt-[22px]">
        <Headline type="sub" text={`${type === 'save' ? '저장' : '수정'}이 완료되었습니다`} />
        <div className="flex justify-center">
          <Body text={`${type === 'save' ? '지도' : '농구장 정보'}로 이동합니다.`} />
        </div>
      </div>
    </div>
  );
};
