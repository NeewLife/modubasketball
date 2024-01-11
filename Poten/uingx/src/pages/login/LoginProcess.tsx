import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import { ILogin, useLoginService } from '@services/login.services';
import { useModal } from '@utils/zustand';
import { NickName } from '@pages/index';

export const LoginProcess = () => {
  const [param] = useSearchParams();
  const navigate = useNavigate();

  const { setOpen } = useModal();

  useEffect(() => {
    useLoginService.login(param.get('code')).then((response: AxiosResponse<ILogin>) => {
      if (response.data.nickname === null) {
        setOpen(<NickName accessToken={response.data.accessToken} />);
      } else {
        localStorage.setItem('accessToken', response.data.accessToken);
      }
      navigate('/map');
    });
  }, []);

  return <div>로그인 완료 중 입니다.</div>;
};
