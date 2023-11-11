import React, { useEffect } from 'react';

import Save from '@constants/icon/save.svg';
import { Body, Headline } from '@components/atoms';
import { useModal } from '@utils/zustand';

interface InfoSuccessProps {
  type: string;
  message: string;

  icon?: string;
}

export const InfoSuccess = (props: InfoSuccessProps) => {
  const { type, message, icon = Save } = props;

  useEffect(() => {
    useModal.setState(() => ({
      width: '360px',
      height: false,
      close: false,
      edit: undefined,
    }));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="save" src={icon} />
      <div className="mt-[22px]">
        <div className="text-center">
          <Headline type="sub" text={type} />
        </div>
        <div className="text-center">
          <Body text={message} />
        </div>
      </div>
    </div>
  );
};
