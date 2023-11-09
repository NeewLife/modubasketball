import React, { useEffect, useState } from 'react';

import Checked from '@constants/icon/checked.svg';
import UnChecked from '@constants/icon/unChecked.svg';
import { Input } from '@components/atoms';

interface CheckBoxProps {
  text?: string;

  check?: boolean;
  key?: number;
  onTrackable?: (check: boolean, key: number) => void;
}

export const CheckBox = (props: CheckBoxProps) => {
  const { text = '', check = true, key = 0, onTrackable = () => {} } = props;

  const [localCheck, setLocalCheck] = useState(true);

  useEffect(() => {
    setLocalCheck(check);
  }, [check]);

  const onClick = () => {
    setLocalCheck(!localCheck);
    onTrackable(localCheck, key);
  };

  return (
    <div className="relative flex items-center cursor-pointer" tabIndex={0} role="button" onClick={onClick}>
      <Input
        type="text"
        className={`pl-[54px] pointer-events-none ${localCheck ? 'text-gray-100' : 'text-gray-60'}`}
        value={text}
      />
      <img alt="check" className="absolute left-[20px]" src={localCheck ? Checked : UnChecked} />
    </div>
  );
};
