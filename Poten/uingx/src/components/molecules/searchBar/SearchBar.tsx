import React, { DetailedHTMLProps, InputHTMLAttributes, useEffect, useState } from 'react';

import Search from '@constants/icon/search.svg';
import { Input } from '@components/atoms';

interface SearchBarProps {
  text?: string;
  onTrackable?: (text: string) => void;
  onSearch?: () => void;
}

export const SearchBar = (
  props: SearchBarProps & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
) => {
  const { text = '', onTrackable = () => {}, onSearch = () => {}, ...prop } = props;

  const [localText, setLocalText] = useState(text);

  useEffect(() => {
    setLocalText(text);
  }, [text]);

  const onChange = (sText: string) => {
    setLocalText(sText);
    onTrackable(sText);
  };

  return (
    <div className="relative flex items-center cursor-pointer">
      <Input
        type="text"
        className="shadow-custom pr-[54px] placeholder:text-gray-50 placeholder:font-[semiBold] placeholder:text-[18px] placeholder:leading-normal"
        placeholder="위치-장소를 검색하세요"
        value={localText}
        onTrackable={onChange}
        {...prop}
      />
      <img alt="search" className="absolute right-[20px]" src={Search} onClick={onSearch} />
    </div>
  );
};
