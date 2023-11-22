import React from 'react';

export const AdminDelete = () => {
  return (
    <div
      className="w-full grid grid-flow-col desktop:grid-rows-2 grid-rows-3 gap-x-[32px] gap-y-[17px] desktop:mb-[46px] mb-[26px] tablet:mx-[15px] mobile:mx-[15px]
                 [&>div]:bg-gray-10 [&>div]:rounded-[10px]
    "
    >
      <div className="desktop:row-span-2">삭제 요청</div>
      <div>삭제 완료</div>
      <div>삭제 취소</div>
    </div>
  );
};
