import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import { ButtonOptionsProps, Headline, Title } from '@components/atoms';
import { useResize } from '@utils/zustand';

export const ButtonLong = (
  props: ButtonOptionsProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
) => {
  const { text, className, ...prop } = props;

  const { type } = useResize();

  return (
    <button
      type="button"
      aria-label="long"
      className="max-w-[500px] desktop:h-[72px] h-[60px] shadow-custom rounded-[10px] bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30 outline-none"
      {...prop}
    >
      {type === 'desktop' ? (
        <Headline type="sub" text={text} color="text-gray-10" />
      ) : (
        <Title type="sub" text={text} color="text-gray-10" />
      )}
    </button>
  );
};
