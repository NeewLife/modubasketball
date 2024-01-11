import React, { useMemo } from 'react';
import Slider from 'react-slick';

import { Image, ImageProps } from '@components/atoms';
import { useResize } from '@utils/zustand';

export interface ImageGroupProps {
  data?: ImageProps[];
}

export const ImageGroup = (props: ImageGroupProps) => {
  const { data = [] } = props;

  const resize = useResize();

  const settings = useMemo(() => {
    return { infinite: false, speed: 500, slidesToShow: resize.type === 'mobile' ? 2 : 3 };
  }, [resize.type]);

  return data.length <= 3 ? (
    <div className="flex desktop:gap-[25px] gap-[20px]">
      {data.map((datum) => (
        <Image key={datum.url} url={datum.url} alt={datum.alt} onClick={datum.onClick} />
      ))}
    </div>
  ) : (
    <Slider {...settings}>
      {data.map((datum) => (
        <Image key={datum.url} url={datum.url} alt={datum.alt} onClick={datum.onClick} />
      ))}
    </Slider>
  );
};
