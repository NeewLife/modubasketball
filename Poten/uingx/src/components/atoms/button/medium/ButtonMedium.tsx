import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Title } from '@components/atoms';

import Plus from '@constants/icon/plus.svg';

export const ButtonMedium = (
  props: ButtonOptionsProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text } = props;

  return (
    <button
      type="button"
      aria-label="big"
      className="w-[220px] h-[60px] shadow-custom rounded-[100px] bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30"
    >
      <div className="flex items-center justify-center gap-[10px]">
        <Title type="main" text={text} color="text-gray-10" />
        <img alt={text} src={Plus} />
      </div>
    </button>
  );
};
