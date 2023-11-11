import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Headline } from '@components/atoms';

interface ButtonBigProps extends ButtonOptionsProps {
  background?: 'gray' | 'secondary';
}

export const ButtonBig = (
  props: ButtonBigProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, background = 'secondary', className, ...prop } = props;

  const backgroundClassName =
    background === 'secondary' ? 'bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30' : 'bg-gray-50';

  return (
    <button
      type="button"
      aria-label="big"
      className={`w-[230px] h-[64px] shadow-custom rounded-[10px] outline-none ${backgroundClassName}`}
      {...prop}
    >
      <Headline type="sub" text={text} color="text-gray-10" />
    </button>
  );
};
