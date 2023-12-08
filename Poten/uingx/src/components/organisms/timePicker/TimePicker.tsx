import React, { useState } from 'react';
import { Body, Caption, Frame } from '@components/atoms';

import { FrameAction } from '@components/molecules';

import Replace from '@constants/icon/replace.svg';
import Clock from '@constants/icon/clock.svg';

const hourData = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
const minData = ['00', '30'];

export const TiemPicker = () => {
  const [type, setType] = useState('');
  const [time, setTime] = useState({
    hour: {
      value: '00',
      check: false,
    },
    min: {
      value: '00',
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

  return (
    <Frame className="w-[295px] h-[200px] bg-gray-10 shadow-custom flex-col [&>div]:flex [&>div]:items-center [&>div]:w-full">
      <div className="justify-center h-[144px] border-b border-gray-20 gap-[20px]">
        <div className="flex flex-col gap-[10px] [&>div]:p-[5px] [&>div]:cursor-pointer">
          <Frame
            onClick={onChangeType('am')}
            className={
              type === 'am'
                ? 'bg-secondary-5 text-secondary-20 border-secondary-10 border'
                : 'bg-gray-15 text-gray-100 border-none'
            }
          >
            <Body text="오전" color="text-gray-60" />
          </Frame>
          <Frame
            onClick={onChangeType('pm')}
            className={
              type === 'pm'
                ? 'bg-secondary-5 text-secondary-20 border-secondary-10 border'
                : 'bg-gray-15 text-gray-100 border-none'
            }
          >
            <Body text="오후" color="text-gray-60" />
          </Frame>
        </div>
        <div className="flex gap-[10px] items-center justify-center">
          <div className="w-[70px]" role="presentation">
            <FrameAction
              swiping={time.hour.check}
              currSlide={time.hour.value}
              data={hourData}
              onTrackable={onTrackableTime('hour')}
              onClick={onClickTime('hour', !time.hour.check)}
            />
          </div>
          <img alt="clock" src={Clock} />
          <div className="w-[70px]" role="presentation">
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
      <div className="grow justify-between px-[24px]">
        <img className="cursor-pointer" alt="replace" src={Replace} onClick={onReset} />
        <Caption
          className={type !== '' ? 'cursor-pointer' : ''}
          color={type !== '' ? 'text-secondary-20' : 'text-gray-50'}
          text="입력"
        />
      </div>
    </Frame>
  );
};
