import React from 'react';
import { ButtonLong, Caption, Headline, Input } from '@components/atoms';

export const NickName = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Headline type="sub" text="환영합니다" />
      <div className="flex flex-col text-center desktop:mt-[20px] mt-[35px]">
        <Caption text="모두의 농구장에서 사용할" color="text-gray-70" />
        <Caption text="닉네임을 입력해주세요." color="text-gray-70" />
      </div>
      <Input className="desktop:mt-[43px] mt-[58px]" placeholder="닉네임을 입력해주세요." />
      <ButtonLong className="mt-[20px]" text="가입하기" />
    </div>
  );
};
