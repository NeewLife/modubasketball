import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';
import { Caption } from '@components/atoms';

export interface InputProps {
  text?: string;
  onTrackable?: (text: string, match?: boolean) => void;

  regex?: {
    regex: RegExp;
    message: string;
  };
}

export const Input = (
  props: InputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const { text = '', onTrackable = () => {}, regex, className, ...prop } = props;

  const [localText, setLocalText] = useState(text);
  const [match, setMatch] = useState(regex ? regex.regex.test(text) : true);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);

    if (regex) {
      const sMatch = regex.regex.test(event.target.value);

      setMatch(sMatch);
      onTrackable(event.target.value, sMatch);
    } else {
      onTrackable(event.target.value);
    }
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className={`flex items-center desktop:p-[20px] p-[12px] w-full bg-gray-10 border ${
          match ? 'border-gray-40' : 'border-brand-30'
        }  rounded-[10px] text-gray-100 font-[regular] text-[18px] leading-normal outline-none ${className}`}
        value={localText}
        onChange={onChange}
        {...prop}
      />
      {regex && !match && (
        <div className="mt-[10px] desktop:pl-[20px] pl-[10px]">
          <Caption text={regex.message} color="text-brand-30" />
        </div>
      )}
    </div>
  );
};
