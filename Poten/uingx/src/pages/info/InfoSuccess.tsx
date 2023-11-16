import React, { useEffect } from 'react';

import Save from '@constants/icon/save.svg';
import { Body, Headline, Title } from '@components/atoms';
import { useModal, useResize } from '@utils/zustand';

interface InfoSuccessProps {
  type: string;
  message: string;

  icon?: string;
}

export const InfoSuccess = (props: InfoSuccessProps) => {
  const { type, message, icon = Save } = props;

  const resize = useResize();

  useEffect(() => {
    useModal.setState(() => ({
      width: resize.type === 'desktop' ? '360px' : '280px',
      height: false,
      close: false,
      edit: undefined,
      isModile: true,
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="save" src={icon} />
      <div className="desktop:mt-[22px] mt-[19px]">
        <div className="text-center">
          {type === 'desktop' ? <Headline type="sub" text={type} /> : <Title type="mainSmall" text={type} />}
        </div>
        <div className="text-center whitespace-nowrap">
          <Body type={type === 'desktop' ? 'main' : 'sub'} text={message} />
        </div>
      </div>
    </div>
  );
};
