import React from 'react';
import { TypographyOptionsProps } from '@components/atoms';

interface BodyProps extends TypographyOptionsProps {
  type?: 'main' | 'sub';
}

export const Body = (props: BodyProps) => {
  const { type = 'main', text, color = 'text-gray-100' } = props;

  const sizeOption = type === 'main' ? 'text-[16px]' : 'text-[14px]';

  return <span className={`font-[regular] leading-normal ${sizeOption} ${color}`}>{text}</span>;
};
