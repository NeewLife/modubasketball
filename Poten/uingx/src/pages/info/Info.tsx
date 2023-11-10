import React from 'react';
import { Headline, Title } from '@components/atoms';
import { Form, IFormTypes } from '@components/templates';

import Edit from '@constants/icon/edit.svg';
import { useModal } from '@utils/zustand/useModal';
import { InfoEdit } from '@pages/index';

export interface InfoProps {
  id: number;
  address: string;
  courtName: string;
  courtType: string;
  courtSize: string;
  goalPost: string;
  feeYn: string;
  parkYn: string;
  comment: string;
}

export const Info = (props: InfoProps) => {
  const { address, courtName, courtType, courtSize, goalPost, feeYn, parkYn, comment } = props;

  const onClickEdit = () => {
    useModal.setState(() => ({ children: <InfoEdit type="update" {...props} /> }));
  };

  const formProps: IFormTypes[] = [
    {
      type: 'input',
      label: '코트 종류',
      prop: {
        disabled: true,
        text: courtType,
        placeholder: '정보를 입력해주세요.',
      },
    },
    {
      type: 'input',
      label: '코트 사이즈',
      prop: {
        disabled: true,
        text: courtSize,
        placeholder: '정보를 입력해주세요.',
      },
    },
    {
      type: 'input',
      label: '골대 수',
      prop: {
        disabled: true,
        text: goalPost,
        type: 'number',
        placeholder: '정보를 입력해주세요.',
      },
    },
    {
      type: 'radio',
      label: '사용료',
      prop: {
        data: [
          {
            id: '1',
            check: feeYn === '무료',
            text: '무료',
          },
          {
            id: '2',
            check: feeYn !== '무료',
            text: '유료',
          },
        ],
        disabled: true,
      },
    },
    {
      type: 'radio',
      label: '주차 여부',
      prop: {
        data: [
          {
            id: '1',
            check: parkYn === '가능',
            text: '가능',
          },
          {
            id: '2',
            check: parkYn !== '가능',
            text: '불가능',
          },
        ],
        disabled: true,
      },
    },
    {
      type: 'textarea',
      label: '기타 정보',
      prop: {
        text: comment,
        rows: 3,
        disabled: true,
        placeholder:
          '저녁 9시가 지나면 조명이 꺼져서 어두워요, 농구 골대 높이가 약간 낮은편이에요 등 자유롭게 적어주세요.',
      },
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Headline type="main" text="농구장 정보" />
        <img className="cursor-pointer mr-[37px]" alt="edit" src={Edit} onClick={onClickEdit} />
      </div>
      <div className="mt-[8px]">
        <Title type="sub" text={address} />
      </div>
      <div className="mt-[2px]">
        <Headline type="sub" text={courtName} color="text-secondary-30" />
      </div>
      <div className="mt-[58px] pl-[20px]">
        <Form data={formProps} />
      </div>
    </div>
  );
};
