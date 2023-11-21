import React from 'react';
import { Body, Headline, Title } from '@components/atoms';

import Layer1 from '@constants/image/layer1.png';
import Layer2 from '@constants/image/layer2.png';
import Layer3 from '@constants/image/layer3.png';
import Layer1Small from '@constants/image/layer1-small.png';
import Layer2Small from '@constants/image/layer2-small.png';
import Layer3Small from '@constants/image/layer3-small.png';

export const LayoutContent = () => {
  return (
    <div
      className="desktop:h-[650px] h-[1200px] bg-gray-20 flex desktop:gap-[110px] gap-[100px] justify-center desktop:pt-[108px]
                 tablet:flex-col
                 mobile:flex-col
                "
    >
      <div className="tablet:flex tablet:flex-col tablet:items-center mobile:flex mobile:flex-col mobile:items-center">
        <div className="desktop:w-[385px] desktop:h-[274px] w-[250px] h-[180px] bg-gray-10 flex items-center justify-center rounded-[30px]">
          <img className="tablet:hidden mobile:hidden" alt="layer1" src={Layer1} />
          <img className="desktop:hidden" alt="layer1" src={Layer1Small} />
        </div>
        <div className="desktop:pl-[20px] desktop:pt-[47px] pt-[30px] flex flex-col gap-[12px]">
          <Headline
            className="tablet:hidden mobile:hidden"
            type="sub"
            text="지도를 이용한 야외 농구장 찾기"
            color="text-brand-30"
          />
          <Title className="desktop:hidden" type="main" text="지도를 이용한 야외 농구장 찾기" color="text-brand-30" />
          <div className="flex flex-col">
            <Body text="내주변에 야외 농구장이 어디 있는지 혹은" />
            <Body text="야외 농구장이 있는지 궁금한 지역을 검색해보세요." />
          </div>
        </div>
      </div>
      <div className="tablet:flex tablet:flex-col tablet:items-center mobile:flex mobile:flex-col mobile:items-center">
        <div className="desktop:w-[385px] desktop:h-[274px] w-[250px] h-[180px] bg-gray-10 flex items-center justify-center rounded-[30px]">
          <img className="tablet:hidden mobile:hidden" alt="layer2" src={Layer2} />
          <img className="desktop:hidden" alt="layer2" src={Layer2Small} />
        </div>
        <div className="desktop:pl-[20px] desktop:pt-[47px] pt-[30px] flex flex-col gap-[12px]">
          <Headline
            className="tablet:hidden mobile:hidden"
            type="sub"
            text="농구장의 상세한 정보 확인"
            color="text-brand-30"
          />
          <Title className="desktop:hidden" type="main" text="농구장의 상세한 정보 확인" color="text-brand-30" />
          <div className="flex flex-col">
            <Body text="코트의 종류와 사이즈, 골대의 개수, 사용료 등 야외" />
            <Body text="농구장을 이용할 때 필요한 정보들을 확인할 수 있어요." />
          </div>
        </div>
      </div>
      <div className="tablet:flex tablet:flex-col tablet:items-center mobile:flex mobile:flex-col mobile:items-center">
        <div className="desktop:w-[385px] desktop:h-[274px] w-[250px] h-[180px] bg-gray-10 flex items-center justify-center rounded-[30px]">
          <img className="tablet:hidden mobile:hidden" alt="layer3" src={Layer3} />
          <img className="desktop:hidden" alt="layer3" src={Layer3Small} />
        </div>
        <div className="desktop:pl-[20px] desktop:pt-[47px] pt-[30px] flex flex-col gap-[12px]">
          <Headline className="tablet:hidden mobile:hidden" type="sub" text="농구장 제보하기" color="text-brand-30" />
          <Title className="desktop:hidden" type="main" text="농구장 제보하기" color="text-brand-30" />
          <div className="flex flex-col">
            <Body text="모두의 농구장은 길거리 농구인들이 직접 제보한" />
            <Body text="농구장 정보가 실시간으로 반영되어 빠르고 정확합니다." />
          </div>
        </div>
      </div>
    </div>
  );
};
