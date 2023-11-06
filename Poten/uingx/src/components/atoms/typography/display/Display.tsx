import React from 'react';
import { TypographyOptionsProps } from '@components/atoms';

export const Display = (props: TypographyOptionsProps) => {
  const { text, color = 'text-gray-100' } = props;

  return <span className={`text-[40px] font-[bold] leading-normal ${color}`}>{text}</span>;
};
