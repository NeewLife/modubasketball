import React from 'react';
import { Body, ButtonBig, Headline } from '@components/atoms';
import { Feedback } from '@pages/index';
import { useModal, useResize } from '@utils/zustand';

import Message from '@constants/image/message.png';

export const FotterFeedback = () => {
  const { setOpen } = useModal();
  const { type } = useResize();

  const onClickFeedback = () => {
    setOpen(<Feedback />);
  };

  return (
    <div className="bg-[#F1FFFF] desktop:h-[696px] h-[581px] flex flex-col items-center justify-center">
      <div>
        <Headline
          type={type === 'desktop' ? 'main' : 'sub'}
          text={type === 'desktop' ? '모두의 농구장이 도움이 되었나요?' : '서비스가 어떠셨나요?'}
          color="text-brand-30"
        />
      </div>
      <div className="flex flex-col items-center mt-[12px]">
        <Body text="모두의 농구장을 이용하시는 모든 분들의 의견은" />
        <Body text="서비스를 개선하는 데 도움이 됩니다." />
      </div>
      <img
        className="desktop:mt-[22px] mt-[28px]"
        alt="message"
        src={Message}
        width={type === 'desktop' ? 220 : 171}
        height={type === 'desktop' ? 229 : 178}
      />
      <div className="desktop:mt-[37px] mt-[33px]">
        <ButtonBig text="피드백 남기기" onClick={onClickFeedback} />
      </div>
    </div>
  );
};
