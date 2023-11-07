import React from 'react';
import { TypographyOptionsProps } from '@components/atoms';

interface HeadlineProps extends TypographyOptionsProps {
  type: 'main' | 'sub';
}

export const Headline = (props: HeadlineProps) => {
  const { type, text, color = 'text-gray-100' } = props;

  const sizeOption = type === 'main' ? 'text-[28px]' : 'text-[20px]';

  return <span className={`font-[semiBold] leading-normal ${sizeOption} ${color}`}>{text}</span>;
};
