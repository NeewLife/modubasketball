import React from 'react';
import { ButtonIcon, ButtonMedium, Headline } from '@components/atoms';
import { Map } from '@components/organisms';

import Location from '@constants/icon/location.svg';
import Arrrow from '@constants/icon/arrow.svg';
import LogoHeader from '@constants/image/logo-header.png';
import { useKeyword } from '@utils/zustand';
import { useNavigate } from 'react-router-dom';
import { sampleData } from './sample';

export const Main = () => {
  const { keyword, type } = useKeyword();
  const navigate = useNavigate();

  const onClickPre = () => {
    navigate('/');
  };

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col relative">
      <div className="h-[70px] flex items-center justify-center relative">
        <img alt="loadHeader" src={LogoHeader} />
        <div className="absolute inset-0 flex items-center pl-[10px]">
          <img className="cursor-pointer mr-[26px]" alt="arrow" src={Arrrow} onClick={onClickPre} />
          <Headline type="sub" text={type === 'search' ? keyword : '내 주변 찾기'} />
        </div>
      </div>
      <div className="grow relative">
        <Map keyword={keyword} type={type} markerData={sampleData} />
        <div className="fixed right-[30px] bottom-[19px] z-50">
          <ButtonIcon text="location" icon={Location} />
        </div>
        <div className="fixed right-[30px] bottom-[84px] z-50">
          <ButtonMedium text="농구장 제보하기" />
        </div>
      </div>
    </div>
  );
};
