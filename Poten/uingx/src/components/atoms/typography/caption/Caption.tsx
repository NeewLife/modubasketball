import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TypographyOptionsProps } from '@components/atoms';

export const Caption = (
  props: TypographyOptionsProps & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>,
) => {
  const { text, color = 'text-gray-100', className, ...prop } = props;

  return (
    <span className={`text-[12px] font-[regular] leading-normal ${color} ${className}`} {...prop}>
      {text}
    </span>
  );
};
