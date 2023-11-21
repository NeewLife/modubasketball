import React, { KeyboardEvent, useEffect, useState } from 'react';
import { ButtonIcon, ButtonMedium, CustomAlert, Headline } from '@components/atoms';
import { CustomAlertAction, SearchBar } from '@components/molecules';
import { Map } from '@components/organisms';

import Location from '@constants/icon/location.svg';
import Arrrow from '@constants/icon/arrow.svg';
import LogoHeader from '@constants/image/logo-header.png';
import LogoSmallHeader from '@constants/image/logo-small-header.png';
import FeedbackIcon from '@constants/icon/feedback.svg';
import Error from '@constants/icon/error.svg';

import { useKeyword, useModal, useResize, useUpdate } from '@utils/zustand';
import { IMap, useMapService } from '@services/index';

import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { Feedback } from '@pages/index';

export const Main = () => {
  const keyword = useKeyword();
  const resize = useResize();
  const { uMap } = useUpdate();
  const { setOpen } = useModal();

  const navigate = useNavigate();

  const [markerData, setMarkerData] = useState<IMap[]>([]);
  const [location, setLocation] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const [isError, setIsError] = useState({
    isError: false,
    message: '',
  });

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
    setIsError({ ...isError, isError: false });
  };

  const onTrackableEdit = (sIsEdit: boolean) => {
    setIsEdit(sIsEdit);
    setIsError({ ...isError, isError: false });
  };

  const onTrackableError = (sIsError: boolean, message: string) => {
    setIsError({ isError: sIsError, message });
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
    useMapService
      .getAll()
      .then((response: AxiosResponse<IMap[]>) => {
        setMarkerData(response.data);
      })
      .catch(() => {
        setMarkerData([]);
      });
  }, [uMap]);

  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setIsEdit(false);
    });
  }, []);

  return (
    <div className="w-screen h-[100dvh] overflow-auto flex flex-col relative">
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
          onTrackableError={onTrackableError}
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
        <div className="absolute top-[10px] w-full flex justify-center z-50">
          {isEdit && <CustomAlert text="제보하실 농구장의 위치를 지도에서 눌러주세요." type="success" />}
          <CustomAlertAction open={isError.isError} text={isError.message} hold={2000} icon={Error} type="error" />
        </div>
      </div>
    </div>
  );
};
