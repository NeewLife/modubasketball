import React, { useMemo } from 'react';
import { ButtonBig, ButtonIcon, ButtonLong, ButtonMedium } from '@components/atoms';

import Location from '@constants/icon/location.svg';

export interface ButtonOptionsProps {
  text: string;
}

interface ButtonProps extends ButtonOptionsProps {
  format?: 'big' | 'icon' | 'long' | 'medium';
}

export const Button = (props: ButtonProps) => {
  const { format = 'big', text } = props;

  const Element = useMemo(() => {
    let sElement;

    switch (format) {
      case 'big':
        sElement = (
          <div className="flex gap-2">
            <ButtonBig text={text} background="gray" />
            <ButtonBig text={text} background="secondary" />
          </div>
        );
        break;
      case 'icon':
        sElement = <ButtonIcon text={text} icon={Location} />;
        break;
      case 'long':
        sElement = <ButtonLong text={text} />;
        break;
      case 'medium':
        sElement = <ButtonMedium text={text} />;
        break;
      default:
        sElement = <ButtonMedium text={text} />;
        break;
    }

    return sElement;
  }, [format, text]);

  return Element;
};
