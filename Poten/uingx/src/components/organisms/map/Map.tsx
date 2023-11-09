import React, { useEffect } from 'react';
import { IMap } from '@services/index';

import Marker from '@constants/image/marker.png';
import { useModal } from '@utils/zustand/useModal';
import { Info, InfoProps } from '@pages/info';

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

  type: 'search' | 'gps';
  keyword: string;
}

export const Map = (props: MapProps) => {
  const { markerData = [], type, keyword } = props;

  const { setOpen } = useModal();

  const onClustererHandler = (map: any, markers: any[]) => {
    const clusterer = new window.kakao.maps.MarkerClusterer({
      map: map,
      averageCenter: true,
      minLevel: 10,
    });

    clusterer.addMarkers(markers);
  };

  const onGecoderHandler = (lat?: number, lon?: number, callback?: (result: GeocoderTypes[]) => void) => {
    const gecoder = new window.kakao.maps.services.Geocoder();
    gecoder.coord2Address(lon, lat, callback);
  };

  const onMarkerHandler = (map: any) => (sMarkerData: IMap[]) => {
    const markers = [];

    for (let i = 0; i < sMarkerData.length; i++) {
      const markerImage = new window.kakao.maps.MarkerImage(Marker, new window.kakao.maps.Size(20, 30));

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(sMarkerData[i].lat, sMarkerData[i].lon),
        image: markerImage,
        clickable: true,
      });

      window.kakao.maps.event.addListener(marker, 'click', () => {
        onGecoderHandler(sMarkerData[i].lat, sMarkerData[i].lon, () => {
          const infoData = {
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
      });

      markers.push(marker);
    }

    onClustererHandler(map, markers);
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

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 6,
    };

    const map = new window.kakao.maps.Map(container, options);

    const ps = new window.kakao.maps.services.Places(map);

    if (type === 'search') ps.keywordSearch(keyword, onSearchHandler(map));
    else {
      if (!navigator.geolocation) {
        alert('사용 불가');
      } else {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          const locPosition = new window.kakao.maps.LatLng(lat, lon);
          map.setCenter(locPosition);
        });
      }
    }

    onMarkerHandler(map)(markerData);
  }, []);

  return <div id="map" className="w-full h-full" />;
};
