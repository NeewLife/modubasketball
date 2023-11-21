import React, { useState, useEffect } from 'react';

import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import Error from '@constants/icon/error.svg';

import { ButtonLong, Caption, Headline, Input, Title } from '@components/atoms';
import { useNavigate } from 'react-router-dom';
import { CustomAlertAction } from '@components/molecules';

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);

  const onChangePassword = (text: string) => {
    setPassword(text);
  };

  const onLogin = () => {
    if (password === 'test') {
      localStorage.setItem('admin', 'test');
      navigate('/admin/detail');
    } else {
      setIsError(true);
    }
  };

  const onTrackableError = (error: boolean) => {
    setIsError(error);
  };

  useEffect(() => {
    if (localStorage.getItem('admin')) navigate('/admin/detail');
  }, []);

  return (
    <div className="w-screen h-[100dvh] overflow-auto relative flex items-center justify-center bg-gray-15">
      <div className="tablet:hidden mobile:hidden absolute top-0 left-0 w-full desktop:h-[70px] h-[44px] flex items-center justify-center bg-gray-10">
        <img className="tablet:hidden mobile:hidden" alt="logoHeader" src={LogoHeader} />
        <img className="desktop:hidden" alt="logoHeader" src={LogoSmallHeader} />
      </div>
      <div className="bg-gray-10 desktop:w-[510px] desktop:h-[488px] w-full h-full flex items-center justify-center flex-col rounded-[30px]">
        <div className="flex flex-col items-center gap-[7px]">
          <Headline
            className="tablet:hidden mobile:hidden"
            type="main"
            text="관리자 로그인"
            color="text-secondary-20"
          />
          <Headline className="desktop:hidden" type="sub" text="관리자 로그인" color="text-secondary-20" />
          <Caption text="관리자 전용 로그인 화면입니다." color="text-gray-80" />
        </div>
        <div className="w-full max-w-[500px] flex flex-col desktop:gap-[17px] gap-[27px] desktop:mt-[90px] mt-[67px] desktop:px-[55px] px-[24px]">
          <div className="flex gap-[9px] items-center">
            <Title className="desktop:hidden" type="main" text="PW" color="text-secondary-20" />
            <Input placeholder="비밀번호" value={password} onTrackable={onChangePassword} />
          </div>
          <ButtonLong text="로그인" onClick={onLogin} />
        </div>
      </div>
      <div className="absolute desktop:top-[90px] top-[10px] w-full flex justify-center">
        <CustomAlertAction
          type="error"
          hold={2000}
          icon={Error}
          open={isError}
          onTrackable={onTrackableError}
          text="비밀번호를 확인해주세요."
        />
      </div>
    </div>
  );
};
