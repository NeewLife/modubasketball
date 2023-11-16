import React, { useCallback, useState, KeyboardEvent } from 'react';
import { ButtonLong, Display, Headline, Title } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { useKeyword, useResize } from '@utils/zustand';
import { useNavigate } from 'react-router-dom';

export const LayoutSearch = () => {
  const [search, setSearch] = useState('');
  const { type, setType } = useKeyword();
  const resize = useResize();

  const navigate = useNavigate();

  const onChange = (sSearch: string) => {
    setSearch(sSearch);
  };

  const onSearchAction = useCallback(
    (sType: 'search' | 'gps') => {
      setType({ keyword: search, type: sType });

      navigate('/map');
    },
    [search, type],
  );

  const onSearch = () => {
    onSearchAction('search');
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.key === 'Enter') onSearchAction('search');
  };

  const onClickGps = () => {
    onSearchAction('gps');
  };

  return (
    <div className="flex flex-col gap-[20px] px-[16px] max-w-[500px]">
      {resize.type === 'desktop' ? (
        <Display text="우리 동네 야외 농구장 지도" color="text-secondary-20" />
      ) : (
        <Headline type="main" text="우리 동네 야외 농구장 지도" color="text-secondary-20" />
      )}
      <div className="flex flex-col">
        {resize.type === 'desktop' ? (
          <>
            <Headline type="main" text="길거리 농구 유목민들이여," />
            <div>
              <Headline type="main" text="모두의 농구장" color="text-secondary-20" />
              <Headline type="main" text="에서" />
            </div>
            <Headline type="main" text="내 주변의 농구장을 찾아보거라." />
          </>
        ) : (
          <>
            <Title type="main" text="길거리 농구 유목민들이여," />
            <div>
              <Title type="main" text="모두의 농구장" color="text-secondary-20" />
              <Title type="main" text="에서" />
            </div>
            <Title type="main" text="내 주변의 농구장을 찾아보거라." />
          </>
        )}
      </div>
      <div className="mt-[14px]">
        <SearchBar text={search} onTrackable={onChange} onSearch={onSearch} onKeyDown={onKeyDown} />
      </div>
      <ButtonLong text="내 주변 농구장 찾기" onClick={onClickGps} />
    </div>
  );
};
