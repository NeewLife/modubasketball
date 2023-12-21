import React, { useEffect, useState } from 'react';
import { AxiosResponse } from 'axios';

import { Title } from '@components/atoms';
import { Table } from '@components/molecules';
import { Info, InfoProps } from '@pages/index';
import { useModal } from '@utils/zustand';

import { IMap, useDeleteService } from '@services/index';

type DeleteTypes = IMap & { deleteCount?: number };

export const AdminDelete = () => {
  const { setOpen } = useModal();

  const [data, setData] = useState({
    require: [] as string[][],
    success: [] as string[][],
    cancel: [] as string[][],
  });

  const columns = [
    {
      id: 'id',
      value: 'id',
      click: false,
    },
    {
      id: 'name',
      value: '이름',
      click: true,
    },
    { id: 'count', value: '요청 수', click: false },
  ];

  const onClickTable = (type: 'ing' | 'ed') => (id: string) => {
    const infoData = {
      id: +id,
      address: '서울 영등포구 양평동 33-3',
      courtName: '이촌 한강공원 농구장',
      courtType: '알 수 없음',
      courtSize: '반코트',
      goalPost: '0',
      feeYn: '무료',
      parkYn: '가능',
      comment: '123',
    } as InfoProps;

    if (type === 'ed') setOpen(<Info mode="info" {...infoData} />);
    else setOpen(<Info mode="delete" {...infoData} />);
  };

  useEffect(() => {
    useDeleteService.getState(0).then((response0: AxiosResponse<DeleteTypes[]>) => {
      useDeleteService.getState(1).then((response1: AxiosResponse<DeleteTypes[]>) => {
        useDeleteService.getState(2).then((response2: AxiosResponse<DeleteTypes[]>) => {
          setData({
            require: response0.data.map((datum) => {
              return [`${datum.id}`, `${datum.courtName}`, `${datum.deleteCount}`];
            }),
            success: response1.data.map((datum) => {
              return [`${datum.id}`, `${datum.courtName}`, `${datum.deleteCount}`];
            }),
            cancel: response2.data.map((datum) => {
              return [`${datum.id}`, `${datum.courtName}`, `${datum.deleteCount}`];
            }),
          });
        });
      });
    });
  }, []);

  return (
    <div
      className="w-full grid grid-flow-col desktop:grid-rows-2 grid-rows-3 desktop:gap-x-[32px] desktop:gap-y-[17px] gap-y-[40px] desktop:mb-[46px] mb-[26px] tablet:mx-[15px] mobile:mx-[15px]
                 [&>div]:bg-gray-10 [&>div]:rounded-[10px] [&>div]:relative
    "
    >
      <div className="desktop:row-span-2">
        <div className="absolute inset-0 overflow-auto px-[30px] py-[20px] scrollbar-thin scrollbar-track-gray-30 scrollbar-thumb-gray-10">
          <Title type="mainSmall" text="삭제 요청" />
          <div className="mt-[15px]">
            <Table columns={columns} data={data.require} callback={onClickTable('ing')} />
          </div>
        </div>
      </div>
      <div>
        <div className="absolute inset-0 overflow-auto px-[30px] py-[20px] scrollbar-thin scrollbar-track-gray-30 scrollbar-thumb-gray-10">
          <Title type="mainSmall" text="삭제 완료" />
          <div className="mt-[15px]">
            <Table columns={columns} data={data.success} callback={onClickTable('ed')} />
          </div>
        </div>
      </div>
      <div>
        <div className="absolute inset-0 overflow-auto px-[30px] py-[20px] scrollbar-thin scrollbar-track-gray-30 scrollbar-thumb-gray-10">
          <Title type="mainSmall" text="삭제 취소" />
          <div className="mt-[15px]">
            <Table columns={columns} data={data.cancel} callback={onClickTable('ed')} />
          </div>
        </div>
      </div>
    </div>
  );
};
