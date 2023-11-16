import React from 'react';

import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import FotterImage from '@constants/image/fotter.png';
import FotterSmallImage from '@constants/image/fotter-small.png';

import { Fotter, FotterFeedback, FotterVisit, LayoutContent, LayoutSearch } from '@pages/index';
import { useResize } from '@utils/zustand';

import Header from '@constants/image/header.png';

export const Home = () => {
  const resize = useResize();

  return (
    <div className="w-screen h-screen overflow-auto">
      <div className="w-full desktop:h-[70px] h-[44px] flex items-center justify-center">
        <img alt="logoHeader" src={resize.type === 'desktop' ? LogoHeader : LogoSmallHeader} />
      </div>
      <div
        className="flex desktop:items-center desktop:justify-center desktop:gap-[265px] desktop:mt-[170px] desktop:mb-[161px]
                   tablet:flex-col tablet:gap-[23px] tablet:mb-[40px] tablet:mt-[72px]
                   mobile:flex-col mobile:gap-[23px] mobile:mb-[40px] mobile:mt-[72px]
                  "
      >
        <div className="tablet:order-2 mobile:order-2">
          <LayoutSearch />
        </div>
        <div
          className="px-[18px]
                     tablet:order-1 tablet:flex tablet:justify-center
                     mobile:order-1  mobile:flex mobile:justify-center
                    "
        >
          <img className="pt-[20px]" alt="header" src={Header} />
        </div>
      </div>
      <LayoutContent />
      <div className="h-[592px] flex items-center justify-center">
        <img alt="fotter" src={resize.type === 'desktop' ? FotterImage : FotterSmallImage} />
      </div>
      <FotterVisit />
      <FotterFeedback />
      <Fotter />
    </div>
  );
};
