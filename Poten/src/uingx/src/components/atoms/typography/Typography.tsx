import React, { useMemo } from 'react';
import { Body, Caption, Display, Headline, Title } from '@components/atoms';

export interface TypographyOptionsProps {
  color?: string;
  text: string;
}

interface TypographyProps extends TypographyOptionsProps {
  format?: 'display' | 'headline' | 'headlineSmall' | 'title' | 'subTitle' | 'body' | 'caption';
}

export const Typography = (props: TypographyProps) => {
  const { format = 'caption', color = 'text-gray-100', text } = props;

  const Element = useMemo(() => {
    let sElement;

    switch (format) {
      case 'display':
        sElement = <Display text={text} color={color} />;
        break;
      case 'headline':
        sElement = <Headline type="main" text={text} color={color} />;
        break;
      case 'headlineSmall':
        sElement = <Headline type="sub" text={text} color={color} />;
        break;
      case 'title':
        sElement = <Title type="main" text={text} color={color} />;
        break;
      case 'subTitle':
        sElement = <Title type="sub" text={text} color={color} />;
        break;
      case 'body':
        sElement = <Body text={text} color={color} />;
        break;
      case 'caption':
        sElement = <Caption text={text} color={color} />;
        break;
      default:
        sElement = <Caption text={text} color={color} />;
        break;
    }

    return sElement;
  }, [format, color, text]);

  return Element;
};
