import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Headline } from '@components/atoms';

export const ButtonLong = (
  props: ButtonOptionsProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, className, ...prop } = props;

  return (
    <button
      type="button"
      aria-label="long"
      className="w-[500px] h-[72px] shadow-custom rounded-[10px] bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30"
      {...prop}
    >
      <Headline type="sub" text={text} color="text-gray-10" />
    </button>
  );
};
