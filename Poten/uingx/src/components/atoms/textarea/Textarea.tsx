import React, { ChangeEvent, DetailedHTMLProps, TextareaHTMLAttributes, useEffect, useState } from 'react';

interface TextareaProps {
  text?: string;
  onTrackable?: (text: string) => void;
}

export const Textarea = (
  props: TextareaProps & DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>,
) => {
  const { text = '', onTrackable = () => {}, className, ...prop } = props;

  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setLocalText(event.target.value);

    onTrackable(event.target.value);
  };

  return (
    <textarea
      className={`w-full rounded-[10px] border border-gray-40 py-[18px] px-[20px] outline-none resize-none text-[18px] leading-normal font-[regular] ${className}`}
      onChange={onChange}
      {...prop}
    >
      {localText}
    </textarea>
  );
};
