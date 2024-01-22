import React, { useEffect, useMemo, MouseEvent, useState, ChangeEvent } from 'react';
import { Body, ButtonBig, Caption, Headline, Title } from '@components/atoms';
import { Form, IFormTypes, ImageForm } from '@components/templates';

import { IModal, useModal } from '@utils/zustand/useModal';
import { InfoEdit, Login, lightData, openData } from '@pages/index';
import { useUpdate } from '@utils/zustand';
import { useDeleteService } from '@services/delete.services';
import { IImage, IMap, useMapService } from '@services/map.service';
import { AxiosResponse } from 'axios';

const webpackMode = process.env.NODE_ENV || 'development';

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
  lightTimeStart?: string;
  lightTimeEnd?: string;
  openTimeStart?: string;
  openTimeEnd?: string;

  imageList?: IImage[];
}

export const Info = (props: InfoProps & { mode?: 'delete' | 'info' }) => {
  const {
    id,
    address,
    courtName,
    courtType,
    courtSize,
    goalPost,
    feeYn,
    parkYn,
    comment,
    mode,
    lightTimeStart,
    lightTimeEnd,
    openTimeStart,
    openTimeEnd,
    imageList = [],
  } = props;

  const { setClose, setOpen } = useModal();
  const { setDelete } = useUpdate();
  const { setData } = useUpdate();

  const [localImageList, setLocalImageList] = useState(imageList);
  const [imageMessage, setImageMessage] = useState('');

  const [isPreviewImage, isSetPreviewImage] = useState(false);
  const [previewImage, setPreviewImage] = useState<Blob>(new Blob());

  const isLightTime = useMemo(() => (lightTimeStart ? '1' : '2'), [lightTimeStart, lightTimeEnd]);
  const lightTime = useMemo(() => {
    const sStart = (lightTimeStart ?? 'am 00:00').split(' ');
    const sEnd = (lightTimeEnd ?? 'am 00:00').split(' ');

    return {
      start: {
        type: sStart[0],
        time: sStart[1],
      },
      end: {
        type: sEnd[0],
        time: sEnd[1],
      },
    };
  }, [lightTimeStart, lightTimeEnd]);

  const isOpenTime = useMemo(() => (openTimeStart ? '1' : '2'), [openTimeStart, openTimeEnd]);
  const openTime = useMemo(() => {
    const sStart = (openTimeStart ?? 'am 00:00').split(' ');
    const sEnd = (openTimeEnd ?? 'am 00:00').split(' ');

    return {
      start: {
        type: sStart[0],
        time: sStart[1],
      },
      end: {
        type: sEnd[0],
        time: sEnd[1],
      },
    };
  }, [openTimeStart, openTimeEnd]);

  const nickname = useMemo(() => localStorage.getItem('nickname'), []);
  const myImageCount = useMemo(() => {
    const sNickname = localStorage.getItem('nickname');

    if (sNickname) return localImageList.filter((image) => image.name === sNickname).length;
    return 0;
  }, [localImageList.length]);

  const path = useMemo(() => {
    return webpackMode === 'development' ? '/proxy' : '';
  }, []);

  const onClickEdit = () => {
    useModal.setState(() => ({ children: <InfoEdit type="update" {...props} /> }));
  };

  const onClickCancel = () => {
    useDeleteService.updateState(2, id).then(() => {
      setClose();
      setDelete();
    });
  };

  const onClickDelete = () => {
    useDeleteService.updateState(1, id).then(() => {
      setClose();
      setDelete();
    });
  };

  const onFileDelete = (name: string) => () => {
    useMapService.imgDelete(name).then(() => {
      useMapService.getOne(id).then((response: AxiosResponse<IMap>) => {
        if (response.data.imageList) setLocalImageList(response.data.imageList);
      });
    });
  };

  const onFileAction = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const len = event.target.files?.length;
    if (myImageCount + len > 3) {
      setImageMessage('* 1인당 최대 3장까지 첨부할 수 있습니다.');
      return;
    }

    let aFiles = Array.from(event.target.files);

    if (len + imageList.length > 4) {
      setImageMessage('* 이미지는 최대 4개까지 저장되어 초과한 이미지는 저장되지 않습니다.');
      aFiles = aFiles.slice(imageList.length - len);
    }

    if (aFiles.length > 0) {
      useMapService.imgUpload(id, aFiles).then(() => {
        useMapService.getOne(id).then((response: AxiosResponse<IMap>) => {
          if (response.data.imageList) setLocalImageList(response.data.imageList);
        });
      });
    }
  };

  const onFilePreAction = (event: MouseEvent<HTMLSpanElement>) => {
    if (!localStorage.getItem('accessToken')) {
      setOpen(<Login />);
      event.preventDefault();
    }
  };

  const onClickImage = (blob: Blob) => () => {
    isSetPreviewImage(true);
    setPreviewImage(blob);
  };

  const onClickImageClose = () => {
    isSetPreviewImage(false);
    setPreviewImage(new Blob());
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
      type: 'date',
      label: '야간 조명',
      prop: {
        check: isLightTime === '1',
        disabled: true,
        startTime: lightTime.start,
        endTime: lightTime.end,
        radio: {
          disabled: true,
          data: lightData.map((datum) => {
            return {
              ...datum,
              check: isLightTime === datum.id,
            };
          }),
        },
      },
    },
    {
      type: 'date',
      label: '개방 시간',
      prop: {
        check: isOpenTime === '1',
        disabled: true,
        startTime: openTime.start,
        endTime: openTime.end,
        radio: {
          disabled: true,
          data: openData.map((datum) => {
            return {
              ...datum,
              check: isOpenTime === datum.id,
            };
          }),
        },
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
      edit: undefined,
    } as IModal;

    useModal.setState(() => modal);
    setData(props);
  }, []);

  return (
    <div className="pt-[10px] pr-[40px] pl-[20px] mobile:p-0 tablet:p-0">
      <Headline className="tablet:hidden mobile:hidden" type="main" text="농구장 정보" />
      <Headline className="desktop:hidden" type="sub" text="농구장 정보" />
      <div className="mt-[8px]">
        <Title className="tablet:hidden mobile:hidden" type="sub" text={address} />
        <Body className="desktop:hidden" type="sub" text={address} color="text-gray-70" />
      </div>
      <div className="mt-[2px] tablet:mt-[5px] mobile:mt-[5px] flex justify-between items-center">
        <div>
          <Headline className="tablet:hidden mobile:hidden" type="sub" text={courtName} color="text-secondary-30" />
          <Title className="desktop:hidden" type="main" text={courtName} color="text-secondary-30" />
        </div>
        <Caption className="cursor-pointer" text="정보 수정하기" color="text-secondary-30" onClick={onClickEdit} />
      </div>
      <div className="mt-[58px] pl-[20px] tablet:mt-[40px] tablet:p-0 mobile:mt-[40px] mobile:p-0 flex flex-col desktop:gap-[60px] gap-[40px]">
        <Form data={formProps} />
        <div className="bg-gray-30 h-[2px]" />
        <div className="desktop:mb-[80px]">
          <ImageForm
            imageData={localImageList.map((datum) => {
              return {
                url: `${path}/img/${datum.name}`,
                alt: `${datum.userNickname} / ${datum.createDate?.split(' ')[0]}`,
                onClickDelete: nickname === datum.userNickname ? onFileDelete(datum.name) : undefined,
                onClickImage: onClickImage,
              };
            })}
            onFileAction={onFileAction}
            onClickAction={onFilePreAction}
            message={imageMessage}
          />
        </div>
      </div>
      {mode === 'delete' && (
        <div className="flex items-center justify-center mt-[50px] desktop:gap-[21px] gap-[10px]">
          <ButtonBig text="취소하기" background="gray" onClick={onClickCancel} />
          <ButtonBig text="삭제하기" background="secondary" color="white" onClick={onClickDelete} />
        </div>
      )}
      {isPreviewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-30 bg-opacity-60 cursor-zoom-out"
          onClick={onClickImageClose}
          role="presentation"
        >
          <img alt="preview" src={URL.createObjectURL(previewImage)} />
        </div>
      )}
    </div>
  );
};
