import React, { DetailedHTMLProps, HTMLAttributes } from 'react';

import Fill from '@constants/icon/radio-fill.svg';
import Regular from '@constants/icon/radio-regular.svg';
import { Title } from '../typography/title';

interface RadioProps {
  text: string;
  check?: boolean;
}

export const Radio = (props: RadioProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const { text, check = true, className, ...prop } = props;

  return (
    <div className={`flex items-center gap-1 ${className}`} {...prop}>
      <img alt={text} width={24} height={24} src={check ? Fill : Regular} />
      <Title type="sub" text={text} color={check ? 'text-gray-100' : 'text-gray-60'} />
    </div>
  );
};
