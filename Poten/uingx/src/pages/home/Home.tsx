import React, { KeyboardEvent, useCallback, useEffect, useState } from 'react';

import LogoHeader from '@constants/image/logo-header.png';
import Layer1 from '@constants/image/layer1.png';
import Layer2 from '@constants/image/layer2.png';
import Layer3 from '@constants/image/layer3.png';
import Fotter from '@constants/image/fotter.png';
import LogoFotter from '@constants/image/logo-fotter.png';
import Header from '@constants/image/header.png';
import Message from '@constants/image/message.png';

import { Body, ButtonBig, ButtonLong, Display, Headline, Title } from '@components/atoms';
import { SearchBar } from '@components/molecules';
import { useKeyword, useModal } from '@utils/zustand';
import { useNavigate } from 'react-router-dom';
import { Feedback } from '@pages/index';
import { IMap, useMapService } from '@services/map.service';
import { AxiosResponse } from 'axios';

export const Home = () => {
  const [search, setSearch] = useState('');
  const { type, setType } = useKeyword();
  const { setOpen } = useModal();

  const navigate = useNavigate();

  const [data, setData] = useState({
    info: 0,
    visit: 0,
  });

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

  const onClickFeedback = () => {
    setOpen(<Feedback />);
  };

  useEffect(() => {
    useMapService.getAll().then((response: AxiosResponse<IMap[]>) => {
      setData({ ...data, info: response.data.length });
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="w-full h-[70px] flex items-center justify-center">
        <img className="mobile:hidden" alt="logoHeader" src={LogoHeader} />
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
      <div className="bg-gray-20 h-[300px] flex items-center justify-center gap-[280px]">
        <div className="flex flex-col items-center">
          <Display text={`${data.info}개`} color="text-secondary-20" />
          <div className="mt-[2px]">
            <Title type="main" text="현재 전국의 농구장 정보가 " />
            <Title type="main" text={data.info.toString()} color="text-secondary-20" />
            <Title type="main" text="개 입력되어 있어요!" />
          </div>
        </div>
        <div className="flex flex-col items-center">
          <Display text={`${data.visit}명`} color="text-secondary-20" />
          <div className="mt-[2px]">
            <Title type="main" text="지금까지 " />
            <Title type="main" text={data.visit.toString()} color="text-secondary-20" />
            <Title type="main" text="명의 농구인들이 이 서비스를 방문했어요!" />
          </div>
        </div>
      </div>
      <div className="bg-[#F1FFFF] h-[696px] flex flex-col items-center justify-center">
        <div>
          <Headline type="main" text="모두의 농구장이 도움이 되었나요?" color="text-brand-30" />
        </div>
        <div className="flex flex-col items-center mt-[12px]">
          <Body text="모두의 농구장을 이용하시는 모든 분들의 의견은" />
          <Body text="서비스를 개선하는 데 도움이 됩니다." />
        </div>
        <img className="mt-[22px]" alt="message" src={Message} />
        <div className="mt-[37px]">
          <ButtonBig text="피드백 남기기" onClick={onClickFeedback} />
        </div>
      </div>
      <div className="h-[200px] flex items-center justify-between bg-gray-20">
        <div className="pl-[119px]">
          <img className="mb-[14px]" alt="logoFotter" src={LogoFotter} />
          <Body text="© 2023. Modubasketball. All rights reserved." />
        </div>
        <div className="pr-[106px] flex">
          <div className="flex flex-col w-20">
            <Body text="Tel" />
            <Body text="E-mail" />
          </div>
          <div className="flex flex-col">
            <Body text="0507-0178-0372" />
            <Body text="wonder.gwb@gmail.com" />
          </div>
        </div>
      </div>
    </div>
  );
};
