import React, { useState } from 'react';

import { Input } from '@components/atoms';
import { TiemPicker } from '@components/organisms';
// import { useTimePicker } from '@utils/zustand';

interface TimeInputProps {
  start?: {
    type: string;
    time: string;
  };
}

export const TimeInput = (props: TimeInputProps) => {
  const { start } = props;

  // const { count } = useTimePicker();

  const [open, setOpen] = useState(false);
  // const idx = useMemo(() => count, []);

  const [timePicker, setTimePicker] = useState({
    type: start ? start.type : '',
    time: start ? start.time : '',
  });

  const onClickInput = () => {
    setOpen(!open);
  };

  const onResult = (type: string, time: string) => {
    setTimePicker({ type, time });
    setOpen(false);
  };

  return (
    <div className="relative inset-0">
      <Input
        className={`desktop:py-[10px] py-[10px] px-[20px] desktop:w-[180px] w-[130px] cursor-pointer ${
          open && 'border-secondary-20'
        }`}
        text={timePicker.time !== '' ? `${timePicker.type}  ${timePicker.time}` : ''}
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
