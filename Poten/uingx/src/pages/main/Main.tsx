import React, { KeyboardEvent, useEffect, useState } from 'react';
import { ButtonIcon, ButtonMedium, Headline } from '@components/atoms';
import Location from '@constants/icon/location.svg';
import Arrrow from '@constants/icon/arrow.svg';
import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import FeedbackIcon from '@constants/icon/feedback.svg';
import { Map } from '@components/organisms';
import { useKeyword, useModal, useResize, useUpdate } from '@utils/zustand';
import { IMap, useMapService } from '@services/index';

import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Feedback } from '@pages/index';
import { SearchBar } from '@components/molecules';

export const Main = () => {
  const keyword = useKeyword();
  const resize = useResize();
  const { uMap } = useUpdate();
  const { setOpen } = useModal();

  const navigate = useNavigate();

  const [markerData, setMarkerData] = useState<IMap[]>([]);
  const [location, setLocation] = useState(0);

  const [isEdit, setIsEdit] = useState(false);

  const [localKeyword, setLocalKeyword] = useState(keyword.keyword);
  const [sendKeyword, setSendKeyword] = useState(keyword.keyword);

  const onClickPre = () => {
    navigate('/');
  };

  const onClickLocation = () => {
    setLocation(location + 1);
  };

  const onClickFeedback = () => {
    setOpen(<Feedback />);
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const onTrackableEdit = (sIsEdit: boolean) => {
    setIsEdit(sIsEdit);
  };

  const onChangeKeyword = (text: string) => {
    setLocalKeyword(text);
  };

  const onKeyDownKeyword = (event: KeyboardEvent<HTMLInputElement>) => {
    event.stopPropagation();

    if (event.key === 'Enter') setSendKeyword(localKeyword);
  };

  const onSearchKeyword = () => {
    setSendKeyword(localKeyword);
  };

  useEffect(() => {
    useMapService.getAll().then((response: AxiosResponse<IMap[]>) => {
      setMarkerData(response.data);
    });
  }, [uMap]);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setIsEdit(false);
    });
  }, []);

  return (
    <div className="w-screen h-screen overflow-auto flex flex-col relative">
      <div className="h-[70px] flex items-center justify-center relative">
        <img
          className="cursor-pointer z-50"
          alt="loadHeader"
          src={resize.type === 'desktop' ? LogoHeader : LogoSmallHeader}
          onClick={onClickPre}
        />
        <div className="absolute inset-0 flex items-center pl-[10px]">
          <img className="cursor-pointer mr-[26px]" alt="arrow" src={Arrrow} onClick={onClickPre} />
          {keyword.type === 'gps' && resize.type === 'desktop' && (
            <Headline className="tablet:hidden mobild:hidden" type="sub" text="내 주변 찾기" />
          )}
        </div>
      </div>
      <div className="grow relative">
        <Map
          keyword={sendKeyword}
          type={keyword.type}
          markerData={markerData}
          onCenter={location}
          isEdit={isEdit}
          onTrackable={onTrackableEdit}
        />
        <div
          className="absolute left-[32px] top-[20px] z-50
                     mobile:left-0 mobile:top-[12px] mobile:w-full mobile:flex mobile:justify-center mobile:px-[27px]
        "
        >
          {keyword.type === 'search' && (
            <SearchBar
              className="h-[50px] mobile:h-[45px] w-[320px]"
              value={localKeyword}
              onKeyDown={onKeyDownKeyword}
              onSearch={onSearchKeyword}
              onTrackable={onChangeKeyword}
            />
          )}
        </div>

        <div
          className="fixed right-[30px] bottom-[42px] z-50 flex flex-col items-end gap-[15px]
                     mobile:right-0 mobile::bottom-[34px] mobile:w-full mobile:justify-center mobile:flex-row mobile:items-center mobile:gap-[10px]
        "
        >
          <ButtonIcon text="feedback" icon={FeedbackIcon} onClick={onClickFeedback} />
          <ButtonIcon className="mobile:order-3" text="location" icon={Location} onClick={onClickLocation} />
          <ButtonMedium text="농구장 제보하기" onClick={onClickEdit} />
        </div>
      </div>
    </div>
  );
};
