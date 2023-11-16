import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Headline, Title } from '@components/atoms';

export const ButtonLong = (
  props: ButtonOptionsProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, className, ...prop } = props;

  return (
    <button
      type="button"
      aria-label="long"
      className="w-full desktop:h-[72px] h-[60px] shadow-custom rounded-[10px] 
               bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30 outline-none
                "
      {...prop}
    >
      <Headline className="tablet:hidden mobile:hidden" type="sub" text={text} color="text-gray-10" />
      <Title className="desktop:hidden" type="sub" text={text} color="text-gray-10" />
    </button>
  );
};
