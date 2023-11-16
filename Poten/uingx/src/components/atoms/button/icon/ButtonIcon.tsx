import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps } from '@components/atoms';

interface ButtonIconProps extends ButtonOptionsProps {
  icon?: string;
}

export const ButtonIcon = (
  props: ButtonIconProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, icon, className, ...prop } = props;

  return (
    <button
      type="button"
      aria-label="icon"
      className={`bg-gray-10 shadow-custom rounded-full desktop:w-[60px] desktop:h-[60px] w-[45px] h-[45px] flex items-center justify-center outline-none ${className}`}
      {...prop}
    >
      <img className="tablet:hidden mobile:hidden" alt={text} src={icon} width={30} height={30} />
      <img className="desktop:hidden" alt={text} src={icon} width={24} height={24} />
    </button>
  );
};
