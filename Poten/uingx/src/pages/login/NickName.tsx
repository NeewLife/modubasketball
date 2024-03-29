import React, { useEffect, useState } from 'react';

import { ButtonLong, Caption, Headline, Input } from '@components/atoms';
import { IModal, useModal } from '@utils/zustand';
import { useLoginService } from '@services/login.services';
import { AxiosResponse } from 'axios';

interface NickNameProps {
  accessToken: string;
  email: string;
}

export const NickName = (props: NickNameProps) => {
  const { accessToken, email } = props;

  const { setClose } = useModal();
  const [text, setText] = useState('');

  const onTrackableText = (sText: string) => {
    setText(sText);
  };

  const onClick = () => {
    useLoginService.check(text).then((response: AxiosResponse<boolean>) => {
      if (response.data)
        useLoginService.register({ nickname: text, email: email }).then(() => {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('nickname', text);
          setClose();
        });
    });
  };

  useEffect(() => {
    const modal = {
      width: '510px',
      height: false,
      close: true,
      isModile: false,
      edit: undefined,
      change: false,
      timeout: false,
    } as IModal;

    useModal.setState(() => modal);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Headline type="sub" text="환영합니다" />
      <div className="flex flex-col text-center desktop:mt-[20px] mt-[35px]">
        <Caption text="모두의 농구장에서 사용할" color="text-gray-70" />
        <Caption text="닉네임을 입력해주세요." color="text-gray-70" />
      </div>
      <Input
        className="desktop:mt-[43px] mt-[58px]"
        placeholder="닉네임을 입력해주세요."
        text={text}
        onTrackable={onTrackableText}
      />
      <ButtonLong className="mt-[20px]" text="가입하기" onClick={onClick} />
    </div>
  );
};
