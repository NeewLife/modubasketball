import React, { useEffect, useState } from 'react';
import { useModal, useResize } from '@utils/zustand';
import { Body, ButtonBig, Caption, Headline, Textarea, Title } from '@components/atoms';

import face1Default from '@constants/image/face-1-default.png';
import face2Default from '@constants/image/face-2-default.png';
import face3Default from '@constants/image/face-3-default.png';
import face4Default from '@constants/image/face-4-default.png';
import face5Default from '@constants/image/face-5-default.png';
import face1Pressed from '@constants/image/face-1-pressed.png';
import face2Pressed from '@constants/image/face-2-pressed.png';
import face3Pressed from '@constants/image/face-3-pressed.png';
import face4Pressed from '@constants/image/face-4-pressed.png';
import face5Pressed from '@constants/image/face-5-pressed.png';
import FeedbackBig from '@constants/icon/feedbackBig.svg';

import { useFeedbackService } from '@services/index';
import { InfoSuccess } from '@pages/index';

export const Feedback = () => {
  const [data, setData] = useState({
    rating: 0,
    comment: '',
  });

  const { setClose } = useModal();
  const { type } = useResize();

  const onClickRating = (key: number) => () => {
    setData({ ...data, rating: key === data.rating ? 0 : key });
  };

  const onChangeComment = (text: string) => {
    setData({ ...data, comment: text });
  };

  const onFeedback = () => {
    if (data.rating === 0) return;

    useFeedbackService.save(data.comment.trim(), data.rating).then((response) => {
      if (response.status === 200) {
        useModal.setState(() => ({
          change: true,
          changeChildren: <div id="end" />,
          children: (
            <InfoSuccess type="피드백이 전달되었습니다!" message="소중한 의견 감사합니다." icon={FeedbackBig} />
          ),
        }));
      }
    });
  };

  const onCancel = () => {
    setClose();
  };

  useEffect(() => {
    useModal.setState(() => ({
      width: '500px',
      height: false,
      close: true,
      edit: undefined,
      isModile: false,
      timeout: true,
    }));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-[25px] tablet:mt-[82px] mobile:mt-[82px]">
          <Headline type="main" text="여러분의 의견을 들려주세요!" />
        </div>
        <div className="mt-[8px]">
          <Title type="sub" text="모두의 농구장이 도움이 되었나요?" />
        </div>

        <div className="flex gap-[12px] mt-[28px] tablet:mt-[32px] mobile:mt-[32px]">
          <div className="flex flex-col gap-[10px] items-center">
            <img
              className="cursor-pointer"
              alt="face1"
              src={data.rating === 5 ? face1Pressed : face1Default}
              width={type === 'desktop' ? 60 : 50}
              height={type === 'desktop' ? 60 : 50}
              onClick={onClickRating(5)}
            />
            <Caption text="최고예요" color="text-gray-70" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <img
              className="cursor-pointer"
              alt="face2"
              src={data.rating === 4 ? face2Pressed : face2Default}
              width={type === 'desktop' ? 60 : 50}
              height={type === 'desktop' ? 60 : 50}
              onClick={onClickRating(4)}
            />
            <Caption text="좋아요" color="text-gray-70" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <img
              className="cursor-pointer"
              alt="face3"
              src={data.rating === 3 ? face3Pressed : face3Default}
              width={type === 'desktop' ? 60 : 50}
              height={type === 'desktop' ? 60 : 50}
              onClick={onClickRating(3)}
            />
            <Caption text="만족해요" color="text-gray-70" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <img
              className="cursor-pointer"
              alt="face4"
              src={data.rating === 2 ? face4Pressed : face4Default}
              width={type === 'desktop' ? 60 : 50}
              height={type === 'desktop' ? 60 : 50}
              onClick={onClickRating(2)}
            />
            <Caption text="별로예요" color="text-gray-70" />
          </div>
          <div className="flex flex-col gap-[10px] items-center">
            <img
              className="cursor-pointer"
              alt="face5"
              src={data.rating === 1 ? face5Pressed : face5Default}
              width={type === 'desktop' ? 60 : 50}
              height={type === 'desktop' ? 60 : 50}
              onClick={onClickRating(1)}
            />
            <Caption text="싫어요" color="text-gray-70" />
          </div>
        </div>
      </div>
      <div className="mt-[60px]">
        {type === 'desktop' ? (
          <Title type="sub" text="더 나아질 수 있는 아이디어가 필요해요!" />
        ) : (
          <Body text="더 나아질 수 있는 아이디어가 필요해요!" />
        )}
      </div>
      <div className="mt-[10px]">
        <Textarea
          value={data.comment}
          onTrackable={onChangeComment}
          rows={3}
          placeholder="여러분의 의견을 들려주세요."
        />
      </div>
      <div className="flex justify-center gap-[18px] mt-[56px]">
        <ButtonBig
          text="보내기"
          color={`${data.rating === 0 ? 'gray' : 'white'}`}
          background={`${data.rating === 0 ? 'white' : 'secondary'}`}
          size="small"
          onClick={onFeedback}
        />
        <ButtonBig text="취소하기" color="white" background="gray" size="small" onClick={onCancel} />
      </div>
    </div>
  );
};
