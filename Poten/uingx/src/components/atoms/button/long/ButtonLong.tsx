import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Headline, Title } from '@components/atoms';

interface ButtonLongProps {
  icon?: string;
  color?: string;
}

export const ButtonLong = (
  props: ButtonOptionsProps &
    ButtonLongProps &
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, className, icon, color = 'text-gray-10', ...prop } = props;

  return (
    <button
      type="button"
      aria-label="long"
      className={`w-full desktop:h-[72px] h-[60px] shadow-custom rounded-[10px] 
               bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30 outline-none relative
                ${className}`}
      {...prop}
    >
      {icon && <img className="absolute left-[20px]" alt="buttonLong" src={icon} />}
      <Headline className="tablet:hidden mobile:hidden" type="sub" text={text} color={color} />
      <Title className="desktop:hidden" type="sub" text={text} color={color} />
    </button>
  );
};
