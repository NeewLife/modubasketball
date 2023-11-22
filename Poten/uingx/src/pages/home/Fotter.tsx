import React from 'react';
import { Body } from '@components/atoms';

import LogoFotter from '@constants/image/logo-fotter.png';
import LogoSmallFotter from '@constants/image/logo-small-fotter.png';
import { Link } from 'react-router-dom';

export const Fotter = () => {
  return (
    <div
      className="desktop:h-[200px] h-[346px] flex desktop:items-center desktop:justify-between bg-gray-20
                 tablet:flex-col tablet:justify-center
                 mobile:flex-col mobile:justify-center
                "
    >
      <div className="desktop:pl-[119px] pl-[24px]">
        <img className="desktop:mb-[14px] mb-[7px] tablet:hidden mobile:hidden" alt="logoFotter" src={LogoFotter} />
        <img className="desktop:mb-[14px] mb-[7px] desktop:hidden" alt="logoSmallFotter" src={LogoSmallFotter} />
        <Body text="© 2023. Modubasketball. All rights reserved." />
      </div>
      <div
        className="desktop:pr-[106px] flex 
                   tablet:pl-[24px] tablet:mt-[52px]
                   mobile:pl-[24px] mobile:mt-[52px]
                  "
      >
        <div className="flex flex-col w-20">
          <Body text="Tel" />
          <Body text="E-mail" />
          <Link to="/admin" target="_blank">
            <Body text="관리자" color="text-gray-70" className="cursor-pointer tablet:mt-[25px] mobile:mt-[25px]" />
          </Link>
        </div>
        <div className="flex flex-col">
          <Body text="0507-0178-0372" />
          <Body text="wonder.gwb@gmail.com" />
        </div>
      </div>
    </div>
  );
};
