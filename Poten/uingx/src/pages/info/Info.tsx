import React, { useEffect } from 'react';
import { Body, ButtonBig, Headline, Title } from '@components/atoms';
import { Form, IFormTypes } from '@components/templates';

import Edit from '@constants/icon/edit.svg';
import { IModal, useModal } from '@utils/zustand/useModal';
import { InfoEdit } from '@pages/index';
import { useResize } from '@utils/zustand';

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
  hasLight: string;
  lightTime?: string;
  openStatus: string;
  openTime?: string;
}

export const Info = (props: InfoProps & { mode?: 'delete' | 'info' }) => {
  const { address, courtName, courtType, courtSize, goalPost, feeYn, parkYn, comment, mode } = props;

  const { type } = useResize();
  const { setClose } = useModal();

  const onClickEdit = () => {
    useModal.setState(() => ({ children: <InfoEdit type="update" {...props} /> }));
  };

  const onClickCancel = () => {
    setClose();
  };

  const onClickDelete = () => {};

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

  useEffect(() => {
    const modal = {
      width: '800px',
      height: true,
      close: true,
      isModile: false,
    } as IModal;

    if (!mode)
      modal.edit = {
        icon: Edit,
        onClick: onClickEdit,
      };

    useModal.setState(() => modal);
  }, []);

  return (
    <div className="pt-[10px] pr-[40px] pl-[20px] mobile:p-0 tablet:p-0">
      <Headline type={type === 'desktop' ? 'main' : 'sub'} text="농구장 정보" />
      <div className="mt-[8px]">
        {type === 'desktop' ? (
          <Title type="sub" text={address} />
        ) : (
          <Body type="sub" text={address} color="text-gray-70" />
        )}
      </div>
      <div className="mt-[2px] tablet:mt-[5px] mobile:mt-[5px]">
        {type === 'desktop' ? (
          <Headline type="sub" text={courtName} color="text-secondary-30" />
        ) : (
          <Title type="main" text={courtName} color="text-secondary-30" />
        )}
      </div>
      <div className="mt-[58px] pl-[20px] tablet:mt-[40px] tablet:p-0 mobile:mt-[40px] mobile:p-0">
        <Form data={formProps} />
      </div>
      {mode === 'delete' && (
        <div className="flex items-center justify-center mt-[50px] desktop:gap-[21px] gap-[10px]">
          <ButtonBig text="취소하기" background="gray" onClick={onClickCancel} />
          <ButtonBig text="삭제하기" background="secondary" color="white" onClick={onClickDelete} />
        </div>
      )}
    </div>
  );
};
