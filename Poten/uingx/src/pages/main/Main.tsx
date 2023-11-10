import React, { useEffect, useState } from 'react';
import { ButtonIcon, ButtonMedium, Headline } from '@components/atoms';
import Location from '@constants/icon/location.svg';
import Arrrow from '@constants/icon/arrow.svg';
import LogoHeader from '@constants/image/logo-header.png';
import { Map } from '@components/organisms';
import { useKeyword, useUpdate } from '@utils/zustand';
import { IMap, useMapService } from '@services/index';

import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

export const Main = () => {
  const { keyword, type } = useKeyword();
  const { uMap } = useUpdate();
  const navigate = useNavigate();

  const [markerData, setMarkerData] = useState<IMap[]>([]);
  const [location, setLocation] = useState(0);
  const [edit, setEdit] = useState(0);

  const onClickPre = () => {
    navigate('/');
  };

  const onClickLocation = () => {
    setLocation(location + 1);
  };

  const onClickEdit = () => {
    setEdit(edit + 1);
  };

  useEffect(() => {
    useMapService.getAll().then((response: AxiosResponse<IMap[]>) => {
      setMarkerData(response.data);
    });
  }, [uMap]);

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
        <Map keyword={keyword} type={type} markerData={markerData} onCenter={location} onEdit={edit} />
        <div className="fixed right-[30px] bottom-[19px] z-50">
          <ButtonIcon text="location" icon={Location} onClick={onClickLocation} />
        </div>
        <div className="fixed right-[30px] bottom-[84px] z-50">
          <ButtonMedium text="농구장 제보하기" onClick={onClickEdit} />
        </div>
      </div>
    </div>
  );
};
