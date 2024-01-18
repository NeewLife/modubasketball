import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { ILogin, useLoginService } from '@services/login.services';
import { useModal } from '@utils/zustand';
import { NickName } from '@pages/index';
import { Headline } from '@components/atoms';

import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import Ball from '@constants/image/layer1.png';

export const LoginProcess = () => {
  const [param] = useSearchParams();
  const navigate = useNavigate();

  const { setOpen } = useModal();

  useEffect(() => {
    useLoginService.login(param.get('code')).then((response: AxiosResponse<ILogin>) => {
      if (response.data.nickname === null) {
        setOpen(<NickName accessToken={response.data.accessToken} email={response.data.email} />);
      } else {
        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('nickname', response.data.email);
      }
      navigate('/map');
    });
  }, []);

  return (
    <div className="w-screen h-[100dvh] bg-gray-15 flex flex-col">
      <div className="tablet:hidden mobile:hidden w-full desktop:h-[70px] h-[44px] flex items-center justify-center bg-gray-10">
        <img className="tablet:hidden mobile:hidden" alt="logoHeader" src={LogoHeader} />
        <img className="desktop:hidden" alt="logoHeader" src={LogoSmallHeader} />
      </div>
      <div className="grow flex flex-col items-center justify-center gap-[40px]">
        <Headline type="sub" text="로그인 하고 있어요" />
        <img className="animate-spin-slow" alt="ball" src={Ball} />
      </div>
    </div>
  );
};
