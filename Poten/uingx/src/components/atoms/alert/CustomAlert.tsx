import React from 'react';
import { Body } from '@components/atoms';

interface CustomAlertProps {
  type: 'error' | 'success';
  text: string;
  icon?: string;
}

export const CustomAlert = (props: CustomAlertProps) => {
  const { type, text, icon } = props;

  const bgOptions = type === 'error' ? 'bg-brand-30' : 'bg-secondary-20';

  return (
    <div
      className={`desktop:min-w-[600px] desktop:w-auto desktop:mx-0 w-full mx-[12px] py-[8px] inline-flex gap-[10px] justify-center items-center rounded-[10px] ${bgOptions}`}
    >
      {icon && <img alt="icon" src={icon} />}
      <Body color="text-gray-10" text={text} />
    </div>
  );
};
