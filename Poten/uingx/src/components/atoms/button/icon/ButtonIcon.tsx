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
      className="bg-gray-10 shadow-custom rounded-full w-[50px] h-[50px] flex items-center justify-center outline-none"
      {...prop}
    >
      <img alt={text} src={icon} width={30} height={30} />
    </button>
  );
};
