import React, { useEffect, useMemo, useState } from 'react';
import { Info, InfoProps, courtSizeData, courtTypeData, feeYnData, parkYnData, InfoSuccess } from '@pages/index';
import { Body, ButtonBig, Headline, Input, Title } from '@components/atoms';
import { Form, IFormTypes } from '@components/templates';
import { useModal, useResize, useUpdate } from '@utils/zustand';
import { useMapService } from '@services/index';

import Delete from '@constants/icon/delete.svg';
import DeleteBig from '@constants/icon/deleteBig.svg';

interface InfoEditProps {
  type: 'update' | 'save';
  lat?: number;
  lon?: number;
}

export const InfoEdit = (props: InfoEditProps & InfoProps) => {
  const { type, lat, lon, ...prop } = props;

  const resize = useResize();

  const [data, setData] = useState({
    ...props,
    courtType: courtTypeData.find((datum) => datum.text === prop.courtType)?.id,
    courtSize: courtSizeData.find((datum) => datum.text === prop.courtSize)?.id,
    feeYn: feeYnData.find((datum) => datum.text === prop.feeYn)?.id,
    parkYn: parkYnData.find((datum) => datum.text === prop.parkYn)?.id,
  });

  const [match, setMatch] = useState({
    courtName: true,
    goalPost: true,
  });

  const isMatch = useMemo(
    () => Object.values(match).every((value) => value === true),
    [match.courtName, match.goalPost],
  );

  const { setMap } = useUpdate();
  const { setClose } = useModal();

  const onClickSave = () => {
    if (!isMatch) return;

    const request = {
      ...props,
      courtName: data.courtName ? data.courtName.trim() : '',
      courtType: courtTypeData.find((datum) => datum.id === data.courtType)?.text,
      courtSize: courtSizeData.find((datum) => datum.id === data.courtSize)?.text,
      goalPost: data.goalPost,
      feeYn: feeYnData.find((datum) => datum.id === data.feeYn)?.text,
      parkYn: parkYnData.find((datum) => datum.id === data.parkYn)?.text,
      comment: data.comment ? data.comment.trim() : '',
    } as InfoProps;

    if (type === 'update') {
      useMapService.update(request).then((response) => {
        if (response.status === 200) {
          setMap();
          useModal.setState(() => ({
            change: true,
            changeChildren: <Info {...request} />,
            children: <InfoSuccess type="수정이 완료되었습니다." message="농구장 정보로 이동합니다." />,
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
            children: <InfoSuccess type="저장이 완료되었습니다." message="지도로 이동합니다." />,
          }));
        }
      });
    }
  };

  const onClickCancel = () => {
    if (type === 'update') useModal.setState(() => ({ children: <Info {...props} /> }));
    else setClose();
  };

  const onClickDelete = () => {
    useMapService.delete(props?.id).then((response) => {
      if (response.status === 200) {
        setMap();
        useModal.setState(() => ({
          change: true,
          changeChildren: <div id="end" />,
          children: (
            <InfoSuccess
              type="삭제 요청 되었습니다."
              message="해당 농구장은 관리자 확인 후 삭제 됩니다."
              icon={DeleteBig}
            />
          ),
        }));
      }
    });
  };

  const onChangeInput = (key: string) => (text: string, sMatch?: boolean) => {
    setData({ ...data, [key]: text });

    if (key === 'courtName' || key === 'goalPost') setMatch({ ...match, [key]: !!sMatch });
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
          regex: { regex: /^[0-9]{1}$|^[1]{1}[0-9]{1}$/, message: '*0 ~ 19사이로 입력해주세요.' },
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

  useEffect(() => {
    useModal.setState(() => ({
      width: '800px',
      height: true,
      close: true,
      isModile: false,
    }));

    if (type === 'update')
      useModal.setState(() => ({
        edit: {
          icon: Delete,
          onClick: onClickDelete,
        },
      }));
  }, []);

  return (
    <div className="pt-[10px] pr-[40px] pl-[20px] mobile:p-0 tablet:p-0">
      <Headline
        type={resize.type === 'desktop' ? 'main' : 'sub'}
        text={`${type === 'update' ? '농구장 정보 수정하기' : '농구장 제보하기'}`}
      />
      <div className="mt-[8px]">
        {resize.type === 'desktop' ? (
          <Title type="sub" text={data.address} />
        ) : (
          <Body type="sub" text={data.address} color="text-gray-70" />
        )}
      </div>
      <div className="desktop:mt-[18px] mt-[10px]">
        <Input
          text={data.courtName}
          onTrackable={onChangeInput('courtName')}
          placeholder="농구장 이름을 입력해주세요."
          regex={{ regex: /^[A-Za-z0-9가-힣\s]{0,20}$/, message: '*20자 이내로 입력해주세요.' }}
        />
      </div>
      <div className="desktop:mt-[58px] desktop:pl-[20px] mt-[45px]">
        <Form data={formProps} />
      </div>
      <div className="flex items-center justify-center mt-[50px] desktop:gap-[21px] gap-[10px]">
        <ButtonBig text="취소하기" background="gray" onClick={onClickCancel} />
        <ButtonBig
          text="저장하기"
          background={`${isMatch ? 'secondary' : 'white'}`}
          color={`${isMatch ? 'white' : 'gray'}`}
          onClick={onClickSave}
        />
      </div>
    </div>
  );
};
