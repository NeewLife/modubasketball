import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import { TypographyOptionsProps } from '@components/atoms';

interface TitleProps extends TypographyOptionsProps {
  type: 'main' | 'sub' | 'mainSmall';
}

export const Title = (props: TitleProps & DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>) => {
  const { type, text, color = 'text-gray-100', className, ...prop } = props;

  const fontOption = type !== 'sub' ? 'font-[semiBold]' : 'font-[regular]';
  const sizeOption = type === 'main' ? 'text-[20px]' : 'text-[18px';

  return (
    <span className={`text-[18px] leading-normal ${fontOption} ${sizeOption} ${color} ${className}`} {...prop}>
      {text}
    </span>
  );
};
