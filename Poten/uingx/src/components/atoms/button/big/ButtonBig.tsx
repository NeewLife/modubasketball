import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC, useMemo } from 'react';
import { ButtonOptionsProps, Headline, Title } from '@components/atoms';
import { useResize } from '@utils/zustand';

interface ButtonBigProps extends ButtonOptionsProps {
  size?: 'big' | 'small';
  background?: 'gray' | 'secondary' | 'white';
  color?: 'gray' | 'white';
}

export const ButtonBig: FC<
  ButtonBigProps & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = (props) => {
  const { text, size = 'big', background = 'secondary', color = 'white', className, ...prop } = props;
  const { type } = useResize();

  const backgroundClassName = useMemo(() => {
    let result;

    switch (background) {
      case 'secondary':
        result = 'bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30';
        break;
      case 'gray':
        result = 'bg-gray-50';
        break;
      case 'white':
        result = 'bg-gray-10 border-2 border-gray-50';
        break;
      default:
        result = 'bg-secondary-20 active:bg-secondary-30 hover:bg-secondary-30';
        break;
    }

    return result;
  }, [background]);

  const colorClassName = color === 'white' ? 'text-gray-10' : 'text-gray-50';
  const sizeClassName = size === 'big' ? 'w-[230px]' : 'w-[182px]';

  return (
    <button
      type="button"
      aria-label="big"
      className={`${sizeClassName} desktop:h-[64px] h-[50px] shadow-custom rounded-[10px] outline-none ${backgroundClassName}`}
      {...prop}
    >
      {type === 'desktop' ? (
        <Headline type="sub" text={text} color={colorClassName} />
      ) : (
        <Title type="mainSmall" text={text} color={colorClassName} />
      )}
    </button>
  );
};
