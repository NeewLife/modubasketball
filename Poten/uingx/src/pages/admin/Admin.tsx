import React, { useState } from 'react';

import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import { Headline, Title } from '@components/atoms';
import { AdminFeedback, AdminDelete } from '@pages/index';

export const Admin = () => {
  const [menu, setMenu] = useState('feedback');

  const onClickMenu = (key: string) => () => {
    setMenu(key);
  };

  return (
    <div className="w-screen h-[100dvh] bg-gray-15 flex flex-col">
      <div className="tablet:hidden mobile:hidden w-full desktop:h-[70px] h-[44px] flex items-center justify-center bg-gray-10">
        <img className="tablet:hidden mobile:hidden" alt="logoHeader" src={LogoHeader} />
        <img className="desktop:hidden" alt="logoHeader" src={LogoSmallHeader} />
      </div>
      <div className="w-full h-[86px] bg-gray-10 flex items-center justify-center">
        <div className="desktop:w-[1380px] w-full tablet:pl-[16px] mobile:pl-[16px] flex items-center desktop:gap-[50px] gap-[20px]">
          <Headline className="tablet:hidden mobile:hidden" type="main" text="관리자 화면" />
          <Headline className="desktop:hidden tablet:mr-[14px] mobile:mr-[14px]" type="sub" text="관리자 화면" />

          <Title
            className="cursor-pointer tablet:hidden mobile:hidden"
            type="main"
            text="피드백"
            color={menu === 'feedback' ? 'text-secondary-30' : 'text-gray-50'}
            onClick={onClickMenu('feedback')}
          />
          <Title
            className="cursor-pointer desktop:hidden"
            type="sub"
            text="피드백"
            color={menu === 'feedback' ? 'text-secondary-30' : 'text-gray-50'}
            onClick={onClickMenu('feedback')}
          />
          <Title
            className="cursor-pointer tablet:hidden mobile:hidden"
            type="main"
            text="농구장 삭제"
            color={menu === 'delete' ? 'text-secondary-30' : 'text-gray-50'}
            onClick={onClickMenu('delete')}
          />
          <Title
            className="cursor-pointer desktop:hidden"
            type="sub"
            text="농구장 삭제"
            color={menu === 'delete' ? 'text-secondary-30' : 'text-gray-50'}
            onClick={onClickMenu('delete')}
          />
        </div>
      </div>
      <div className="relative desktop:w-[1380px] w-full grow flex justify-center m-auto desktop:pt-[46px] pt-[26px]">
        {menu === 'feedback' && <AdminFeedback />}
        {menu === 'delete' && <AdminDelete />}
      </div>
    </div>
  );
};
