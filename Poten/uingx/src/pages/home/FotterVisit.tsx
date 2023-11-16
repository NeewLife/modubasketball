import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';
import { Display, Title } from '@components/atoms';
import { IMap, useMapService } from '@services/index';

export const FotterVisit = () => {
  const [data, setData] = useState({
    info: 0,
    visit: 0,
  });

  useEffect(() => {
    useMapService
      .getAll()
      .then((response: AxiosResponse<IMap[]>) => {
        setData({ ...data, info: response.data.length });
      })
      .catch(() => {
        setData({ ...data, info: 0 });
      });
  }, []);

  return (
    <div
      className="bg-gray-20 desktop:h-[300px] h-[430px] flex items-center justify-center desktop:gap-[280px] gap-[73px]
                 tablet:flex-col 
                 mobile:flex-col
                "
    >
      <div className="flex flex-col items-center">
        <Display text={`${data.info}개`} color="text-secondary-20" />
        <div className="desktop:mt-[2px] mt-[5px] flex flex-col items-center">
          <div className="tablet:hidden mobile:hidden">
            <Title type="main" text="현재 전국의 농구장 정보가 " />
            <Title type="main" text={data.info.toString()} color="text-secondary-20" />
            <Title type="main" text="개 입력되어 있어요!" />
          </div>
          <Title className="desktop:hidden" type="main" text="현재 전국의 농구장 정보가" />
          <div className="desktop:hidden">
            <Title type="main" text={data.info.toString()} color="text-secondary-20" />
            <Title type="main" text="개 입력되어 있어요!" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Display text={`${data.visit}명`} color="text-secondary-20" />
        <div className="desktop:mt-[2px] mt-[5px] flex flex-col items-center">
          <div className="tablet:hidden mobile:hidden">
            <Title type="main" text="지금까지 " />
            <Title type="main" text={data.visit.toString()} color="text-secondary-20" />
            <Title type="main" text="명의 농구인들이 이 서비스를 방문했어요!" />
          </div>
          <div className="desktop:hidden">
            <Title type="main" text="지금까지 " />
            <Title type="main" text={data.visit.toString()} color="text-secondary-20" />
            <Title type="main" text="명의 농구인들이" />
          </div>
          <Title className="desktop:hidden" type="main" text="이 서비스를 방문했어요!" />
        </div>
      </div>
    </div>
  );
};
