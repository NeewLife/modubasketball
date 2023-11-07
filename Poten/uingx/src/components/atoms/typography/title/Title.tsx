import React from 'react';
import { TypographyOptionsProps } from '@components/atoms';

interface TitleProps extends TypographyOptionsProps {
  type: 'main' | 'sub';
}

export const Title = (props: TitleProps) => {
  const { type, text, color = 'text-gray-100', ...prop } = props;

  const fontOption = type === 'main' ? 'font-[semiBold]' : 'font-[regular]';

  return (
    <span className={`text-[18px] leading-normal ${fontOption} ${color}`} {...prop}>
      {text}
    </span>
  );
};
