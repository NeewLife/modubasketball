import React, { useMemo, useState } from 'react';
import { Info, InfoProps, courtSizeData, courtTypeData, feeYnData, parkYnData, InfoSuccess } from '@pages/index';
import { ButtonBig, Headline, Input, Title } from '@components/atoms';
import { Form, IFormTypes } from '@components/templates';
import { useModal, useUpdate } from '@utils/zustand';
import { useMapService } from '@services/index';

interface InfoEditProps {
  type: 'update' | 'save';
  lat?: number;
  lon?: number;
}

export const InfoEdit = (props: InfoEditProps & InfoProps) => {
  const { type, lat, lon, ...prop } = props;

  const [data, setData] = useState({
    ...props,
    courtType: courtTypeData.find((datum) => datum.text === prop.courtType)?.id,
    courtSize: courtSizeData.find((datum) => datum.text === prop.courtSize)?.id,
    feeYn: feeYnData.find((datum) => datum.text === prop.feeYn)?.id,
    parkYn: parkYnData.find((datum) => datum.text === prop.parkYn)?.id,
  });

  const { setMap } = useUpdate();
  const { setClose } = useModal();

  const onClickSave = () => {
    const request = {
      ...props,
      courtName: data.courtName,
      courtType: courtTypeData.find((datum) => datum.id === data.courtType)?.text,
      courtSize: courtSizeData.find((datum) => datum.id === data.courtSize)?.text,
      goalPost: data.goalPost,
      feeYn: feeYnData.find((datum) => datum.id === data.feeYn)?.text,
      parkYn: parkYnData.find((datum) => datum.id === data.parkYn)?.text,
      comment: data.comment,
    } as InfoProps;

    if (type === 'update') {
      useMapService.update(request).then((response) => {
        if (response.status === 200) {
          setMap();
          useModal.setState(() => ({
            change: true,
            changeChildren: <Info {...request} />,
            children: <InfoSuccess type="update" />,
          }));
        }
      });
    } else {
      useMapService.save({ ...request, lat: lat, lon: lon }).then((response) => {
        if (response.status === 200) {
          setMap();
          useModal.setState(() => ({
            change: true,
            changeChildren: <div id="end" />,
            children: <InfoSuccess type="save" />,
          }));
        }
      });
    }
  };

  const onClickCancel = () => {
    if (type === 'update') useModal.setState(() => ({ children: <Info {...props} /> }));
    else setClose();
  };

  const onChangeInput = (key: string) => (text: string) => {
    setData({ ...data, [key]: text });
  };

  const formProps: IFormTypes[] = useMemo(
    () => [
      {
        type: 'checkBox',
        label: '코트 종류',
        prop: {
          data: courtTypeData.map((datum) => {
            return {
              ...datum,
              check: datum.id === data.courtType,
            };
          }),
          onTrackable: onChangeInput('courtType'),
        },
      },
      {
        type: 'checkBox',
        label: '코트 사이즈',
        prop: {
          data: courtSizeData.map((datum) => {
            return {
              ...datum,
              check: datum.id === data.courtSize,
            };
          }),
          onTrackable: onChangeInput('courtSize'),
        },
      },
      {
        type: 'input',
        label: '골대 수',
        prop: {
          text: data.goalPost,
          type: 'number',
          onTrackable: onChangeInput('goalPost'),
          placeholder: '정보를 입력해주세요.',
        },
      },
      {
        type: 'radio',
        label: '사용료',
        prop: {
          data: feeYnData.map((datum) => {
            return {
              ...datum,
              check: datum.id === data.feeYn,
            };
          }),
          onTrackable: onChangeInput('feeYn'),
        },
      },
      {
        type: 'radio',
        label: '주차 여부',
        prop: {
          data: parkYnData.map((datum) => {
            return {
              ...datum,
              check: datum.id === data.parkYn,
            };
          }),
          onTrackable: onChangeInput('parkYn'),
        },
      },
      {
        type: 'textarea',
        label: '기타 정보',
        prop: {
          text: data.comment,
          rows: 3,
          onTrackable: onChangeInput('comment'),
          placeholder:
            '저녁 9시가 지나면 조명이 꺼져서 어두워요, 농구 골대 높이가 약간 낮은편이에요 등 자유롭게 적어주세요.',
        },
      },
    ],
    [data],
  );

  return (
    <div>
      <div>
        <Headline type="main" text={`${type === 'update' ? '농구장 정보 수정하기' : '농구장 제보하기'}`} />
      </div>
      <div className="mt-[8px]">
        <Title type="sub" text={data.address} />
      </div>
      <div className="mt-[2px]">
        <Input
          text={data.courtName}
          onTrackable={onChangeInput('courtName')}
          placeholder="농구장 이름을 입력해주세요."
        />
      </div>
      <div className="mt-[58px] pl-[20px]">
        <Form data={formProps} />
      </div>
      <div className="flex items-center justify-center mt-[50px] gap-[21px]">
        <ButtonBig text="취소하기" background="gray" onClick={onClickCancel} />
        <ButtonBig text="저장하기" background="secondary" onClick={onClickSave} />
      </div>
    </div>
  );
};
