import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TypographyOptionsProps } from '@components/atoms';

interface HeadlineProps extends TypographyOptionsProps {
  type: 'main' | 'sub';
}

export const Headline = (
  props: HeadlineProps & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
) => {
  const { type, text, color = 'text-gray-100', className, ...prop } = props;

  const sizeOption = type === 'main' ? 'text-[28px]' : 'text-[24px]';

  return (
    <span className={`font-[semiBold] leading-normal ${sizeOption} ${color} ${className}`} {...prop}>
      {text}
    </span>
  );
};
