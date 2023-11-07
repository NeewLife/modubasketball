import React from 'react';

import Fill from '@constants/icon/radio-fill.svg';
import Regular from '@constants/icon/radio-regular.svg';
import { Title } from '../typography/title';

interface RadioProps {
  text: string;
  check?: boolean;
}

export const Radio = (props: RadioProps) => {
  const { text, check = true } = props;

  return (
    <div className="flex items-center gap-1">
      <img alt={text} width={24} height={24} src={check ? Fill : Regular} />
      <Title type="sub" text={text} color={check ? 'text-gray-100' : 'text-gray-60'} />
    </div>
  );
};
