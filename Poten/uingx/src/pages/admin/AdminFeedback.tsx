import React, { useEffect, useState } from 'react';

import { AxiosResponse } from 'axios';
import { Body, Caption } from '@components/atoms';

import Face1Pressed from '@constants/image/face-1-pressed.png';
import Face2Pressed from '@constants/image/face-2-pressed.png';
import Face3Pressed from '@constants/image/face-3-pressed.png';
import Face4Pressed from '@constants/image/face-4-pressed.png';
import Face5Pressed from '@constants/image/face-5-pressed.png';

import { IFeedback, useFeedbackService } from '@services/feedback.service';

export const AdminFeedback = () => {
  const [data, setData] = useState<IFeedback[]>([]);
  const [currPage, setCurrPage] = useState(1);

  const onScroll = (event: any) => {
    const isScrollBottom = event.target.scrollTop >= event.target.scrollHeight - event.target.clientHeight;

    if (isScrollBottom) setCurrPage(currPage + 1);
  };

  useEffect(() => {
    useFeedbackService.getAll(currPage).then((response: AxiosResponse<IFeedback[]>) => {
      if (response.data.length > 0) setData(data.concat(response.data));
    });
  }, [currPage]);

  return (
    <div
      className="absolute inset-0 overflow-auto tablet:mx-[15px] mobile:mx-[15px] scrollbar-none"
      onScroll={onScroll}
    >
      <div className="desktop:mt-[47px] mt-[20px] desktop:mb-[47px] mb-[20px] flex flex-col gap-[20px]">
        {data.map((datum) => (
          <div
            key={datum.id}
            className="w-full bg-gray-10 px-[20px] py-[10px] rounded-[10px] flex items-center desktop:gap-[15px] gap-[10px] tablet:flex-col mobile:flex-col"
          >
            <Caption
              className="tablet:hidden mobile:hidden"
              text={datum.fdCreateDate.split(' ')[0]}
              color="text-gray-60"
            />
            <Caption
              className="tablet:hidden mobile:hidden"
              text={datum.fdCreateDate.split(' ')[1]}
              color="text-gray-60"
            />

            <div className="tablet:hidden mobile:hidden">
              {datum.fdRating === 1 && <img alt={datum.id.toString()} src={Face5Pressed} width={30} height={30} />}
              {datum.fdRating === 2 && <img alt={datum.id.toString()} src={Face4Pressed} width={30} height={30} />}
              {datum.fdRating === 3 && <img alt={datum.id.toString()} src={Face3Pressed} width={30} height={30} />}
              {datum.fdRating === 4 && <img alt={datum.id.toString()} src={Face2Pressed} width={30} height={30} />}
              {datum.fdRating === 5 && <img alt={datum.id.toString()} src={Face1Pressed} width={30} height={30} />}
            </div>

            <div className="desktop:hidden w-full flex justify-between items-center">
              <div className="flex gap-[10px]">
                <Caption text={datum.fdCreateDate.split(' ')[0]} color="text-gray-60" />
                <Caption text={datum.fdCreateDate.split(' ')[1]} color="text-gray-60" />
              </div>
              <div>
                {datum.fdRating === 1 && <img alt={datum.id.toString()} src={Face5Pressed} width={30} height={30} />}
                {datum.fdRating === 2 && <img alt={datum.id.toString()} src={Face4Pressed} width={30} height={30} />}
                {datum.fdRating === 3 && <img alt={datum.id.toString()} src={Face3Pressed} width={30} height={30} />}
                {datum.fdRating === 4 && <img alt={datum.id.toString()} src={Face2Pressed} width={30} height={30} />}
                {datum.fdRating === 5 && <img alt={datum.id.toString()} src={Face1Pressed} width={30} height={30} />}
              </div>
            </div>

            <div className="flex-1 tablet:self-start mobile:self-start">
              <Body text={datum.fdComment ? datum.fdComment : ''} />
            </div>
          </div>
        ))}
        {data.length === 0 && <Caption text="데이터가 없습니다." color="text-gray-60" />}
      </div>
    </div>
  );
};
