import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';

interface InputProps {
  text?: string;
  onTrackable?: (text: string) => void;
}

export const Input = (
  props: InputProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const { text = '', onTrackable = () => {}, className, ...prop } = props;

  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLocalText(event.target.value);
    onTrackable(event.target.value);
  };

  return (
    <input
      type="text"
      className={`flex items-center p-[20px] w-full bg-gray-10 border border-gray-40 rounded-[10px] text-gray-100 font-[regular] text-[18px] leading-normal outline-none ${className}`}
      value={localText}
      onChange={onChange}
      {...prop}
    />
  );
};
