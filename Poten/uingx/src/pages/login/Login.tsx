import React from 'react';
import { ButtonLong, Caption, Headline } from '@components/atoms';

import Kakao from '@constants/icon/kakao.svg';

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center">
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
        className="bg-[#ffE500] active:bg-[#ffE500] hover:bg-[#ffE500] desktop:mt-[81px] mt-[92px]"
        icon={Kakao}
      />
    </div>
  );
};
