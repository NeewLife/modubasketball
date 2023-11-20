import React, { useEffect, useState } from 'react';
import { Body, Caption } from '@components/atoms';

import Face1Pressed from '@constants/image/face-1-pressed.png';
import Face2Pressed from '@constants/image/face-2-pressed.png';
import Face3Pressed from '@constants/image/face-3-pressed.png';
import Face4Pressed from '@constants/image/face-4-pressed.png';
import Face5Pressed from '@constants/image/face-5-pressed.png';

import { FeedbackTypes, sampleFeedbackData } from './sample';

export const AdminFeedback = () => {
  const [data, setData] = useState<FeedbackTypes[]>([]);

  const [limit, setLimit] = useState(20);

  const onScroll = (event: any) => {
    const isScrollBottom = event.target.scrollTop >= event.target.scrollHeight - event.target.clientHeight;

    if (isScrollBottom) setLimit(limit + 20);
  };

  useEffect(() => {
    setData(sampleFeedbackData.slice(0, limit));
  }, [limit]);

  return (
    <div className="absolute inset-0 overflow-auto flex flex-col gap-[20px]" onScroll={onScroll}>
      {data.map((datum) => (
        <div
          key={datum.id}
          className="w-full bg-gray-10 px-[20px] py-[10px] rounded-[10px] flex items-center gap-[15px]"
        >
          <Caption text="2023-12-01" color="text-gray-60" />
          <Caption text="13:40:23" color="text-gray-60" />

          {datum.tdLating === 1 && <img alt={datum.id.toString()} src={Face5Pressed} width={30} height={30} />}
          {datum.tdLating === 2 && <img alt={datum.id.toString()} src={Face4Pressed} width={30} height={30} />}
          {datum.tdLating === 3 && <img alt={datum.id.toString()} src={Face3Pressed} width={30} height={30} />}
          {datum.tdLating === 4 && <img alt={datum.id.toString()} src={Face2Pressed} width={30} height={30} />}
          {datum.tdLating === 5 && <img alt={datum.id.toString()} src={Face1Pressed} width={30} height={30} />}

          <div>
            <Body text={datum.fbComment} />
          </div>
        </div>
      ))}
    </div>
  );
};
