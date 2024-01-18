import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Input } from '@components/atoms';
import { TiemPicker } from '@components/organisms';
import { useTimePicker } from '@utils/zustand';

interface TimeInputProps {
  start?: {
    type: string;
    time: string;
  };

  isDisabled?: boolean;
  onTrackable?: (type: string, time: string) => void;
}

export const TimeInput = (props: TimeInputProps) => {
  const { start, isDisabled = false, onTrackable = () => {} } = props;

  const { target, setTarget } = useTimePicker();

  const [open, setOpen] = useState(false);
  const [timePicker, setTimePicker] = useState({
    type: start ? start.type : '',
    time: start ? start.time : '',
  });

  const localTarget = useMemo(() => uuidv4(), []);

  const onClickInput = () => {
    if (isDisabled) return;

    const nOpen = !open;

    setOpen(nOpen);
    if (nOpen) setTarget(localTarget);
  };

  const onResult = (type: string, time: string) => {
    setTimePicker({ type, time });
    onTrackable(type, time);
    setOpen(false);
  };

  useEffect(() => {
    if (target !== localTarget) setOpen(false);
  }, [target]);

  useEffect(() => {
    if (start) setTimePicker(start);
  }, [start]);

  return (
    <div className="relative inset-0">
      <Input
        className={`desktop:py-[10px] py-[10px] px-[20px] desktop:w-[180px] w-[130px] ${
          !isDisabled && 'cursor-pointer'
        } ${open && 'border-secondary-20'}`}
        text={timePicker.time !== '' ? `${timePicker.type === 'am' ? '오전' : '오후'}  ${timePicker.time}` : ''}
        readOnly
        onClick={onClickInput}
        placeholder="오전  00:00"
      />
      {open && (
        <div className="absolute top-full left-0 z-50 mt-[10px]">
          <TiemPicker start={{ type: timePicker.type, time: timePicker.time }} onResult={onResult} />
        </div>
      )}
    </div>
  );
};
