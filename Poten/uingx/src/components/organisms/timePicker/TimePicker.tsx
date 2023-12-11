import React, { useState } from 'react';
import { Body, Caption, Frame } from '@components/atoms';

import { FrameAction } from '@components/molecules';

import Replace from '@constants/icon/replace.svg';
import Clock from '@constants/icon/clock.svg';

const hourData = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
const minData = ['00', '30'];

interface TiemPickerProps {
  start?: {
    type: string;
    time: string;
  };

  onResult?: (type: string, time: string) => void;
}

export const TiemPicker = (props: TiemPickerProps) => {
  const { onResult = () => {}, start } = props;

  const [type, setType] = useState(start ? start.type : '');
  const [time, setTime] = useState({
    hour: {
      value: start && start.time !== '' ? start.time.split(':')[0] : '00',
      check: false,
    },
    min: {
      value: start && start.time !== '' ? start.time.split(':')[1] : '00',
      check: false,
    },
  });

  const onChangeType = (sType: string) => () => {
    setType(sType);
  };

  const onClickTime = (sTime: 'hour' | 'min', sCheck: boolean) => () => {
    const nTime = {
      hour: {
        value: time.hour.value,
        check: sTime === 'hour' ? sCheck : false,
      },
      min: {
        value: time.min.value,
        check: sTime === 'min' ? sCheck : false,
      },
    };

    setTime(nTime);
  };

  const onTrackableTime = (sTime: 'hour' | 'min') => (datum: string) => {
    setTime({
      ...time,
      [sTime]: {
        ...time[sTime],
        value: datum,
      },
    });
  };

  const onReset = () => {
    setType('');
    setTime({
      hour: {
        value: '00',
        check: false,
      },
      min: {
        value: '00',
        check: false,
      },
    });
  };

  const onLocalResult = () => {
    onResult(type, `${time.hour.value}:${time.min.value}`);
  };

  return (
    <Frame className="desktop:w-[295px] desktop:h-[200px] w-[160px] h-[120px] bg-gray-10 shadow-custom flex-col [&>div]:flex [&>div]:items-center [&>div]:w-full">
      <div className="justify-center desktop:h-[144px] h-[90px] border-b border-gray-20 desktop:gap-[20px] gap-[12px]">
        <div className="flex flex-col desktop:gap-[10px] gap-[8px] [&>div]:p-[5px] [&>div]:cursor-pointer">
          <Frame
            onClick={onChangeType('오전')}
            className={
              type === '오전'
                ? 'bg-secondary-5 text-secondary-20 border-secondary-10 border'
                : 'bg-gray-15 text-gray-100 border-none'
            }
          >
            <Body text="오전" color="text-gray-60" className="tablet:hidden mobile:hidden" />
            <span className="text-[10px] font-[regular] leading-normal text-gray-60 desktop:hidden">오전</span>
          </Frame>
          <Frame
            onClick={onChangeType('오후')}
            className={
              type === '오후'
                ? 'bg-secondary-5 text-secondary-20 border-secondary-10 border'
                : 'bg-gray-15 text-gray-100 border-none'
            }
          >
            <Body text="오후" color="text-gray-60" className="tablet:hidden mobile:hidden" />
            <span className="text-[10px] font-[regular] leading-normal text-gray-60 desktop:hidden">오후</span>
          </Frame>
        </div>
        <div className="flex desktop:gap-[10px] gap-[5px] items-center justify-center">
          <div className="desktop:w-[70px] w-[40px]" role="presentation">
            <FrameAction
              swiping={time.hour.check}
              currSlide={time.hour.value}
              data={hourData}
              onTrackable={onTrackableTime('hour')}
              onClick={onClickTime('hour', !time.hour.check)}
            />
          </div>
          <img alt="clock" src={Clock} />
          <div className="desktop:w-[70px] w-[40px]" role="presentation">
            <FrameAction
              swiping={time.min.check}
              currSlide={time.min.value}
              data={minData}
              onTrackable={onTrackableTime('min')}
              onClick={onClickTime('min', !time.min.check)}
            />
          </div>
        </div>
      </div>
      <div className="grow justify-between desktop:px-[24px] px-[13px]">
        <img className="cursor-pointer" alt="replace" src={Replace} onClick={onReset} />
        <Caption
          className={type !== '' ? 'cursor-pointer' : 'pointer-events-none'}
          color={type !== '' ? 'text-secondary-20' : 'text-gray-50'}
          text="입력"
          onClick={onLocalResult}
        />
      </div>
    </Frame>
  );
};
