import React, { useEffect, useState } from 'react';
import { useModal } from '@utils/zustand';
import { ButtonBig, Headline, Textarea, Title } from '@components/atoms';

import face1Default from '@constants/image/face-1-default.png';
import face2Default from '@constants/image/face-2-default.png';
import face3Default from '@constants/image/face-3-default.png';
import face4Default from '@constants/image/face-4-default.png';
import face5Default from '@constants/image/face-5-default.png';
import face1Pressed from '@constants/image/Face-1-Pressed.png';
import face2Pressed from '@constants/image/Face-2-Pressed.png';
import face3Pressed from '@constants/image/Face-3-Pressed.png';
import face4Pressed from '@constants/image/Face-4-Pressed.png';
import face5Pressed from '@constants/image/Face-5-Pressed.png';
import FeedbackBig from '@constants/icon/feedbackBig.svg';

import { useFeedbackService } from '@services/index';
import { InfoSuccess } from '@pages/index';

export const Feedback = () => {
  const [data, setData] = useState({
    rating: 0,
    comment: '',
  });

  const { setClose } = useModal();

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
    }));
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="mt-[25px]">
          <Headline type="main" text="여러분의 의견을 들려주세요!" />
        </div>
        <div className="mt-[8px]">
          <Title type="sub" text="모두의 농구장이 도움이 되었나요?" />
        </div>

        <div className="flex gap-[12px] mt-[28px]">
          <img
            className="cursor-pointer"
            alt="face1"
            src={data.rating === 5 ? face1Pressed : face1Default}
            width={60}
            height={60}
            onClick={onClickRating(5)}
          />
          <img
            className="cursor-pointer"
            alt="face2"
            src={data.rating === 4 ? face2Pressed : face2Default}
            width={60}
            height={60}
            onClick={onClickRating(4)}
          />
          <img
            className="cursor-pointer"
            alt="face3"
            src={data.rating === 3 ? face3Pressed : face3Default}
            width={60}
            height={60}
            onClick={onClickRating(3)}
          />
          <img
            className="cursor-pointer"
            alt="face4"
            src={data.rating === 2 ? face4Pressed : face4Default}
            width={60}
            height={60}
            onClick={onClickRating(2)}
          />
          <img
            className="cursor-pointer"
            alt="face5"
            src={data.rating === 1 ? face5Pressed : face5Default}
            width={60}
            height={60}
            onClick={onClickRating(1)}
          />
        </div>
      </div>
      <div className="mt-[60px]">
        <Title type="sub" text="더 나아질 수 있는 아이디어가 필요해요!" />
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
          text="저장하기"
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
