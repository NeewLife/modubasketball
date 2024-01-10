import React, { useEffect } from 'react';
import { AxiosResponse } from 'axios';

import { ButtonLong, Caption, Headline } from '@components/atoms';
import Kakao from '@constants/icon/kakao.svg';
import { IModal, useModal, useUpdate } from '@utils/zustand';
import { IMap, useMapService } from '@services/map.service';
import { Info, InfoProps } from '@pages/index';

export const Login = () => {
  const { lastId } = useUpdate();

  useEffect(() => {
    useMapService.getOne(lastId).then((response: AxiosResponse<IMap>) => {
      const infoData = {
        id: lastId,
        address: response.data.address ? response.data.address : '',
        courtName: response.data.courtName ? response.data.courtName : '',
        courtType: response.data.courtType ? response.data.courtType : '알 수 없음',
        courtSize: response.data.courtSize ? response.data.courtSize : '반코트',
        goalPost: response.data.goalPost ? response.data.goalPost : '0',
        feeYn: response.data.feeYn ? response.data.feeYn : '무료',
        parkYn: response.data.parkYn ? response.data.parkYn : '가능',
        comment: response.data.comment ? response.data.comment : '',
        imageList: response.data.imageList,
      } as InfoProps;

      const modal = {
        width: '510px',
        height: false,
        close: true,
        isModile: false,
        edit: undefined,
        change: true,
        timeout: false,
        changeChildren: <Info {...infoData} />,
      } as IModal;

      useModal.setState(() => modal);
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center my-[60px]">
      <div className="flex flex-col text-center">
        <Headline type="sub" text="앗, 이미지를 업로드 하려면" />
        <Headline type="sub" text="로그인이 필요해요" />
      </div>
      <div className="flex flex-col text-center desktop:mt-[20px] mt-[35px]">
        <Caption text="직접 촬영 혹은 저작권을 보유하신 사진을" color="text-gray-70" />
        <Caption text="계시해주세요. 모두의 농구장은 사진의" color="text-gray-70" />
        <Caption text="저작권에 관련한 어떠한 책임도 지지 않습니다." color="text-gray-70" />
      </div>
      <ButtonLong
        text="카카오 로그인"
        color="text-gray-100"
        className="!bg-[#ffE500] !active:bg-[#ffE500] !hover:bg-[#ffE500] desktop:mt-[81px] mt-[92px]"
        icon={Kakao}
      />
    </div>
  );
};
