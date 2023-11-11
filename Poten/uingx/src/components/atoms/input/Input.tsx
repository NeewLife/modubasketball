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
  const [match, setMatch] = useState(true);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);

    if (regex) setMatch(regex.regex.test(event.target.value));
    // const match = /^[A-Za-z0-9가-힣]{0,20}$/.test(event.target.value);
    onTrackable(event.target.value, match);
  };

  return (
    <div className="w-full">
      <input
        type="text"
        className={`flex items-center p-[20px] w-full bg-gray-10 border ${
          match ? 'border-gray-40' : 'border-brand-30'
        }  rounded-[10px] text-gray-100 font-[regular] text-[18px] leading-normal outline-none ${className}`}
        value={localText}
        onChange={onChange}
        {...prop}
      />
      {regex && !match && (
        <div className="mt-[10px] pl-[20px]">
          <Caption text={regex.message} color="text-brand-30" />
        </div>
      )}
    </div>
  );
};
