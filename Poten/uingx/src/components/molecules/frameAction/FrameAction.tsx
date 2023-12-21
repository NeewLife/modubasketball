import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import { Frame } from '@components/atoms';

import Up from '@constants/icon/up.svg';
import Down from '@constants/icon/down.svg';

interface FrameActionProps {
  swiping?: boolean;
  currSlide: string;

  data?: string[];
  onTrackable?: (datum: string) => void;
}

export const FrameAction = (
  props: FrameActionProps & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) => {
  const { swiping = false, currSlide = 0, data = [], onTrackable = () => {}, ...prop } = props;

  const ref = useRef<Slider>(null);

  const [localCurrSlide, setLocalCurrSlide] = useState(0);
  const [localSwiping, setLocalSwiping] = useState(swiping);

  const onWheel = (event: WheelEvent) => {
    const slide = localCurrSlide + (event.deltaY > 0 ? 1 : -1);

    ref.current?.slickGoTo(slide);
  };

  const onClick = (num: number) => () => {
    ref.current?.slickGoTo(num);
  };

  const onPreventDefault = (event: any) => {
    event.preventDefault();
  };

  useEffect(() => {
    setLocalSwiping(swiping);
  }, [swiping]);

  useEffect(() => {
    if (ref.current) {
      const index = data.findIndex((value) => value === currSlide);

      setLocalCurrSlide(index);
      ref.current.slickGoTo(index);
    }
  }, [ref.current, currSlide]);

  useEffect(() => {
    if (ref.current) ref.current.slickGoTo(0);
  }, [ref.current]);

  useEffect(() => {
    if (ref.current && localSwiping) {
      window.addEventListener('wheel', onWheel);

      document.getElementById('modal')?.addEventListener('wheel', onPreventDefault);
      document.getElementById('modal')?.addEventListener('mousewheel', onPreventDefault);
    }

    return () => {
      window.removeEventListener('wheel', onWheel);
      document.getElementById('modal')?.removeEventListener('wheel', onPreventDefault);
      document.getElementById('modal')?.removeEventListener('mousewheel', onPreventDefault);
    };
  }, [ref.current, localSwiping, localCurrSlide]);

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    infinite: true,
    afterChange: (currentSlide: number) => {
      setLocalCurrSlide(currentSlide);
      onTrackable(data[currentSlide]);
    },
  };

  return (
    <div className="flex flex-col items-center desktop:gap-[10px] gap-[5px]">
      {swiping && <img className="cursor-pointer" alt="up" src={Up} onClick={onClick(localCurrSlide - 1)} />}
      <Slider
        className={`text-center desktop:p-[10px] p-[8px] border [&>button]:!hidden cursor-pointer ${
          swiping ? 'bg-secondary-5 text-secondary-20 border-secondary-10' : 'bg-gray-15 text-gray-100 border-none'
        }`}
        verticalSwiping={localSwiping}
        ref={ref}
        {...settings}
      >
        {data.map((datum) => (
          <Frame key={datum} {...prop}>
            <span className="font-[regular] leading-normal desktop:text-[40px] text-[20px]">{datum}</span>
          </Frame>
        ))}
      </Slider>
      {swiping && <img className="cursor-pointer" alt="down" src={Down} onClick={onClick(localCurrSlide + 1)} />}
    </div>
  );
};
