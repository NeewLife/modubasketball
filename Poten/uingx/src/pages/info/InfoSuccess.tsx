import React from 'react';

import Save from '@constants/icon/save.svg';
import { Body, Headline } from '@components/atoms';

interface InfoSuccessProps {
  type: string;
  message: string;

  icon?: string;
}

export const InfoSuccess = (props: InfoSuccessProps) => {
  const { type, message, icon = Save } = props;

  return (
    <div className="flex flex-col items-center justify-center">
      <img alt="save" src={icon} />
      <div className="mt-[22px]">
        <Headline type="sub" text={type} />
        <div className="flex justify-center">
          <Body text={message} />
        </div>
      </div>
    </div>
  );
};
