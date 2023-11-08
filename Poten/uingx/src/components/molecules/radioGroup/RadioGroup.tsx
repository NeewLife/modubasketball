import React, { useState } from 'react';

import { Radio } from '@components/atoms';

interface RadioGroupProps {
  data?: { id: string; text: string; check: boolean }[];
  onTrackable?: (id: string) => void;
}

export const RadioGroup = (props: RadioGroupProps) => {
  const { data = [], onTrackable = () => {} } = props;

  const [localData, setLocalData] = useState(data);

  const onClick = (id: string) => () => {
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
    <div className="flex items-center gap-[24px]">
      {localData.map(({ id, text, check }) => (
        <Radio className="cursor-pointer" key={id} text={text} check={check} onClick={onClick(id)} />
      ))}
    </div>
  );
};
