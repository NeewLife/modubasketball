import React, { useEffect } from 'react';

import { ButtonLong, Caption, Headline } from '@components/atoms';
import Kakao from '@constants/icon/kakao.svg';
import { IModal, useModal, useUpdate } from '@utils/zustand';
import { Info } from '@pages/index';

export const Login = () => {
  const { lastData } = useUpdate();

  const onClick = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URL}`;
  };

  useEffect(() => {
    if (lastData) {
      const modal = {
        width: '510px',
        height: false,
        close: true,
        isModile: false,
        edit: undefined,
        change: true,
        timeout: false,
        changeChildren: <Info {...lastData} />,
      } as IModal;

      useModal.setState(() => modal);
    }
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
        onClick={onClick}
      />
    </div>
  );
};
