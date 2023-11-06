import React from 'react';
import { TypographyOptionsProps } from '@components/atoms';

export const Caption = (props: TypographyOptionsProps) => {
  const { text, color = 'text-gray-100' } = props;

  return <span className={`text-[12px] font-[regular] leading-normal ${color}`}>{text}</span>;
};
