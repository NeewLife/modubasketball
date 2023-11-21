import React, { useEffect, useMemo, useState } from 'react';

import Checked from '@constants/icon/checked.svg';
import UnChecked from '@constants/icon/unChecked.svg';
import { Input } from '@components/atoms';

interface CheckBoxProps {
  text?: string;

  check?: boolean;
  id?: string;
  onTrackable?: (id: string) => void;

  rounded?: 'top' | 'bottom' | 'all' | 'none';
}

export const CheckBox = (props: CheckBoxProps) => {
  const { text = '', check = true, id = '', onTrackable = () => {}, rounded = 'none' } = props;

  const [localCheck, setLocalCheck] = useState(check);

  useEffect(() => {
    setLocalCheck(check);
  }, [check]);

  const classNameRounded = useMemo(() => {
    let sRounded;

    switch (rounded) {
      case 'top':
        sRounded = 'rounded-[10px] rounded-b-none';
        break;
      case 'bottom':
        sRounded = 'rounded-[10px] rounded-t-none';
        break;
      case 'all':
        sRounded = 'rounded-[10px]';
        break;
      case 'none':
        sRounded = 'rounded-none';
        break;
      default:
        sRounded = 'rounded-none';
        break;
    }

    return sRounded;
  }, [rounded]);

  const onClick = () => {
    onTrackable(id);
  };

  return (
    <div className="relative flex items-center cursor-pointer" tabIndex={0} role="button" onClick={onClick}>
      <Input
        type="text"
        className={`desktop:pl-[54px] tablet:pl-[54px] mobile:pl-[54px] pointer-events-none ${classNameRounded} ${
          localCheck ? 'text-gray-100' : 'text-gray-60'
        }`}
        value={text}
      />
      <img alt="check" className="absolute left-[20px]" src={localCheck ? Checked : UnChecked} />
    </div>
  );
};
