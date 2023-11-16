import React from 'react';
import { Body, ButtonBig, Headline } from '@components/atoms';
import { Feedback } from '@pages/index';
import { useModal } from '@utils/zustand';

import Message from '@constants/image/message.png';

export const FotterFeedback = () => {
  const { setOpen } = useModal();

  const onClickFeedback = () => {
    setOpen(<Feedback />);
  };

  return (
    <div className="bg-[#F1FFFF] desktop:h-[696px] h-[581px] flex flex-col items-center justify-center">
      <div>
        <Headline
          className="tablet:hidden mobile:hidden"
          type="main"
          text="모두의 농구장이 도움이 되었나요?"
          color="text-brand-30"
        />
        <Headline className="desktop:hidden" type="sub" text="서비스가 어떠셨나요?" color="text-brand-30" />
      </div>
      <div className="flex flex-col items-center mt-[12px]">
        <Body text="모두의 농구장을 이용하시는 모든 분들의 의견은" />
        <Body text="서비스를 개선하는 데 도움이 됩니다." />
      </div>
      <img
        className="desktop:mt-[22px] mt-[28px] desktop:w-[220px] desktop:h-[229px] w-[171px] h-[178px]"
        alt="message"
        src={Message}
      />
      <div className="desktop:mt-[37px] mt-[33px]">
        <ButtonBig text="피드백 남기기" onClick={onClickFeedback} />
      </div>
    </div>
  );
};
