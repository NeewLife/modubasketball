import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps } from '@components/atoms';
import { useResize } from '@utils/zustand';

interface ButtonIconProps extends ButtonOptionsProps {
  icon?: string;
}

export const ButtonIcon = (
  props: ButtonIconProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, icon, className, ...prop } = props;

  const { type } = useResize();

  return (
    <button
      type="button"
      aria-label="icon"
      className={`bg-gray-10 shadow-custom rounded-full desktop:w-[60px] desktop:h-[60px] tablet:w-[45px] tablet:h-[45px] mobile:w-[45px] mobile:h-[45px] flex items-center justify-center outline-none ${className}`}
      {...prop}
    >
      <img alt={text} src={icon} width={type === 'desktop' ? 30 : 24} height={type === 'desktop' ? 30 : 24} />
    </button>
  );
};
