import React, { KeyboardEvent, useCallback, useState } from 'react';

import LogoHeader from '@constants/image/logo-header.png';
import Layer1 from '@constants/image/layer1.png';
import Layer2 from '@constants/image/layer2.png';
import Layer3 from '@constants/image/layer3.png';
import Fotter from '@constants/image/fotter.png';
import LogoFotter from '@constants/image/logo-fotter.png';
import Header from '@constants/image/header.png';

import { Body, ButtonLong, Display, Headline } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { useKeyword } from '@utils/zustand';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [search, setSearch] = useState('');
  const { keyword, type, setType } = useKeyword();

  const navigate = useNavigate();

  const onChange = (sSearch: string) => {
    setSearch(sSearch);
  };

  const onSearchAction = useCallback(
    (sType: 'search' | 'gps') => {
      setType({ keyword: search, type: sType });

      navigate('/map');
    },
    [keyword, type],
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
    <div className="w-screen h-screen overflow-auto">
      <div className="w-full h-[70px] flex items-center justify-center">
        <img alt="logoHeader" src={LogoHeader} />
      </div>
      <div className="h-[791px] flex items-center justify-center gap-[265px]">
        <div className="flex flex-col gap-[20px]">
          <Display text="우리 동네 야외 농구장 지도" color="text-secondary-20" />
          <div className="flex flex-col">
            <Headline type="main" text="길거리 농구 유목민들이여," />
            <div>
              <Headline type="main" text="모두의 농구장" color="text-secondary-20" />
              <Headline type="main" text="에서" />
            </div>
            <Headline type="main" text="내 주변의 농구장을 찾아보거라." />
          </div>
          <div className="mt-[14px]">
            <SearchBar text={search} onTrackable={onChange} onSearch={onSearch} onKeyDown={onKeyDown} />
          </div>
          <ButtonLong text="내 주변 농구장 찾기" onClick={onClickGps} />
        </div>
        <img className="pt-[20px]" alt="header" src={Header} />
      </div>
      <div className="h-[650px] bg-gray-20 flex gap-[110px] justify-center pt-[108px]">
        <div>
          <div className="w-[385px] h-[274px] bg-gray-10 flex items-center justify-center rounded-[30px]">
            <img alt="layer1" src={Layer1} />
          </div>
          <div className="pl-[20px] pt-[47px] flex flex-col gap-[12px]">
            <Headline type="sub" text="지도를 이용한 야외 농구장 찾기" color="text-brand-30" />
            <div className="flex flex-col">
              <Body text="내주변에 야외 농구장이 어디 있는지 혹은" />
              <Body text="야외 농구장이 있는지 궁금한 지역을 검색해보세요." />
            </div>
          </div>
        </div>
        <div>
          <div className="w-[385px] h-[274px] bg-gray-10 flex items-center justify-center rounded-[30px]">
            <img alt="layer2" src={Layer2} />
          </div>
          <div className="pl-[20px] pt-[47px] flex flex-col gap-[12px]">
            <Headline type="sub" text="농구장의 상세한 정보 확인" color="text-brand-30" />
            <div className="flex flex-col">
              <Body text="코트의 종류와 사이즈, 골대의 개수, 사용료 등 야외" />
              <Body text="농구장을 이용할 때 필요한 정보들을 확인할 수 있어요." />
            </div>
          </div>
        </div>
        <div>
          <div className="w-[385px] h-[274px] bg-gray-10 flex items-center justify-center rounded-[30px]">
            <img alt="layer3" src={Layer3} />
          </div>
          <div className="pl-[20px] pt-[47px] flex flex-col gap-[12px]">
            <Headline type="sub" text="농구장 제보하기" color="text-brand-30" />
            <div className="flex flex-col">
              <Body text="모두의 농구장은 길거리 농구인들이 직접 제보한" />
              <Body text="농구장 정보가 실시간으로 반영되어 빠르고 정확합니다." />
            </div>
          </div>
        </div>
      </div>
      <div className="h-[592px] flex items-center justify-center">
        <img alt="fotter" src={Fotter} />
      </div>
      <div className="h-[200px] flex items-center justify-between bg-gray-20">
        <img alt="logoFotter" src={LogoFotter} className="pl-[119px]" />
        <div className="pr-[106px]">
          <Body text="© 2023. Modubasketball. All rights reserved." />
        </div>
      </div>
    </div>
  );
};
