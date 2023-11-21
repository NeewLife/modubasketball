import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TypographyOptionsProps } from '@components/atoms';

export const Display = (
  props: TypographyOptionsProps & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
) => {
  const { text, color = 'text-gray-100', className, ...prop } = props;

  return (
    <span className={`text-[40px] font-[bold] leading-normal ${color} ${className}`} {...prop}>
      {text}
    </span>
  );
};
