import React, { useEffect, useState } from 'react';
import { IMap } from '@services/index';

import Marker from '@constants/image/marker.png';
import GeoLocation from '@constants/icon/geoLocation.svg';

import { useModal } from '@utils/zustand/useModal';
import { Info, InfoEdit, InfoProps } from '@pages/index';

type PlaceTypes = {
  id: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
};

type GeocoderTypes = {
  address: {
    address_name: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    zip_code: string;
  };
  road_address: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    zone_no: string;
  };
};

interface MapProps {
  markerData: IMap[];
  onCenter?: number;

  isEdit?: boolean;
  onTrackable?: (isEdit: boolean) => void;

  type: 'search' | 'gps';
  keyword: string;
}

export const Map = (props: MapProps) => {
  const { markerData = [], type, keyword, onCenter = 0, isEdit = false, onTrackable = () => [] } = props;

  const { setOpen } = useModal();
  const [localMap, setLocalMap] = useState();
  const [localManager, setLocalManager] = useState<any>();

  const onGecoderHandler = (lat?: number, lon?: number, callback?: (result: GeocoderTypes[]) => void) => {
    const gecoder = new window.kakao.maps.services.Geocoder();
    gecoder.coord2Address(lon, lat, callback);
  };

  const onClustererHandler = (map: any, markers: any[]) => {
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
    });

    clusterer.addMarkers(markers);
  };

  const onMarkerHandler = (map: any) => (sMarkerData: IMap[]) => {
    const markers = [];

    for (let i = 0; i < sMarkerData.length; i++) {
      const markerImage = new window.kakao.maps.MarkerImage(Marker, new window.kakao.maps.Size(30, 30));

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(sMarkerData[i].lat, sMarkerData[i].lon),
        image: markerImage,
        clickable: true,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        const infoData = {
          id: sMarkerData[i].id,
          address: sMarkerData[i].address ? sMarkerData[i].address : '',
          courtName: sMarkerData[i].courtName ? sMarkerData[i].courtName : '',
          courtType: sMarkerData[i].courtType ? sMarkerData[i].courtType : '알 수 없음',
          courtSize: sMarkerData[i].courtSize ? sMarkerData[i].courtSize : '반코트',
          goalPost: sMarkerData[i].goalPost ? sMarkerData[i].goalPost : '0',
          feeYn: sMarkerData[i].feeYn ? sMarkerData[i].feeYn : '무료',
          parkYn: sMarkerData[i].parkYn ? sMarkerData[i].parkYn : '가능',
          comment: sMarkerData[i].comment ? sMarkerData[i].comment : '',
        } as InfoProps;

        setOpen(<Info {...infoData} />);
      });

      markers.push(marker);
    }

    onClustererHandler(map, markers);
  };

  const onMarkerLocationHandler = (map: any) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locPosition = new window.kakao.maps.LatLng(lat, lon);
      const markerImage = new window.kakao.maps.MarkerImage(GeoLocation, new window.kakao.maps.Size(30, 30));

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
      const marker = new window.kakao.maps.Marker({
        map: map,
        position: locPosition,
        image: markerImage,
      });
    });
  };

  const onSearchHandler = (map: any) => (data: PlaceTypes[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      map.setBounds(bounds);
    }
  };

  const onGeoLocationHandler = (map: any) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const locPosition = new window.kakao.maps.LatLng(lat, lon);
      map.setCenter(locPosition);
    });
  };

  const onSearchCenter = (map: any) => {
    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(keyword, onSearchHandler(map));
  };

  const onDrawend = (manager: any) => (data: any) => {
    const position = data.coords.toLatLng();

    onGecoderHandler(position.getLat(), position.getLng(), (result) => {
      if (result.length === 0) {
        alert('생성 불가 지역');
        return;
      }

      const address = result[0].road_address ? result[0].road_address.address_name : result[0].address.address_name;

      const infoData = {
        address: address,
      } as InfoProps;

      setOpen(<InfoEdit type="save" {...infoData} lat={position.getLat()} lon={position.getLng()} />);
      onTrackable(false);
    });

    manager.remove(data.target);
  };

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    if (type === 'search') onSearchCenter(map);
    else {
      if (!navigator.geolocation) {
        alert('사용 불가');
      } else {
        onGeoLocationHandler(map);
      }
    }
    setLocalMap(map);

    const manager = new window.kakao.maps.drawing.DrawingManager({
      map: map,
      drawingMode: [window.kakao.maps.drawing.OverlayType.MARKER],
    });

    manager.addListener('drawend', onDrawend(manager));
    setLocalManager(manager);
  }, []);

  useEffect(() => {
    if (localMap) {
      onSearchCenter(localMap);
    }
  }, [keyword]);

  useEffect(() => {
    if (localMap) {
      onMarkerHandler(localMap)(markerData);
      onMarkerLocationHandler(localMap);
    }
  }, [markerData]);

  useEffect(() => {
    if (localMap) onGeoLocationHandler(localMap);
  }, [onCenter]);

  useEffect(() => {
    if (localManager) {
      if (isEdit) localManager.select(window.kakao.maps.drawing.OverlayType.MARKER);
      else localManager.cancel();
    }
  }, [isEdit]);

  return <div id="map" className="w-full h-full" />;
};
