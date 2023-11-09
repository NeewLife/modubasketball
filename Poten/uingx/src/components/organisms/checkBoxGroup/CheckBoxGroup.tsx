import React, { useState } from 'react';
import { CheckBox } from '@components/molecules';

export interface CheckBoxGroupProps {
  data: { id: string; text: string; check: boolean }[];
  onTrackable?: (id: string) => void;
}

export const CheckBoxGroup = (props: CheckBoxGroupProps) => {
  const { data = [], onTrackable = () => {} } = props;

  const [localData, setLocalData] = useState(data);

  const onRounded = (index: number) => {
    let sRounded: 'top' | 'bottom' | 'none' | 'all';

    switch (index) {
      case 0:
        sRounded = 'top';
        break;
      case data.length - 1:
        sRounded = 'bottom';
        break;
      default:
        sRounded = 'none';
        break;
    }

    return sRounded;
  };

  const onClick = (id: string) => {
    setLocalData(
      localData.map((prop) => {
        return {
          ...prop,
          check: prop.id === id,
        };
      }),
    );

    onTrackable(id);
  };

  return (
    <div className="flex flex-col">
      {localData.map(({ id, text, check }, index) => (
        <CheckBox key={id} id={id} text={text} check={check} rounded={onRounded(index)} onTrackable={onClick} />
      ))}
    </div>
  );
};
