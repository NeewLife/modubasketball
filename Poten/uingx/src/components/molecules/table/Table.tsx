import React from 'react';
import { Body, Title } from '@components/atoms';

import { v4 as uuidv4 } from 'uuid';

interface TableProps {
  columns: {
    id: string;
    value: string;
    click: boolean;
  }[];

  data: Array<string>[];
  callback?: (id: string) => void;
}

export const Table = (props: TableProps) => {
  const { columns, data, callback = () => {} } = props;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center border-b border-gray-30 py-[6px] pl-[18px] pr-[12px]">
        {columns.map(
          (column, index) =>
            index !== 0 && <Body type="sub" key={column.id} text={column.value} color="text-gray-70" />,
        )}
      </div>
      <div className="flex flex-col">
        {data.map((datum, index) => (
          <div
            className={`flex justify-between border-gray-30 py-[13px] pl-[18px] pr-[22px] ${
              index !== data.length - 1 && 'border-b'
            }`}
            key={uuidv4()}
          >
            {datum.map(
              (str, sIndex) =>
                sIndex !== 0 && (
                  <Title
                    type="sub"
                    key={uuidv4()}
                    text={str}
                    color={columns[sIndex].click ? 'text-secondary-30' : 'text-gray-100'}
                    className={columns[sIndex].click ? 'cursor-pointer' : ''}
                    onClick={columns[sIndex].click ? () => callback(datum[0]) : () => {}}
                  />
                ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
