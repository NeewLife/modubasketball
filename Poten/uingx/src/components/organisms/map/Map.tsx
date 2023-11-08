import React, { useEffect } from 'react';

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

interface MapProps {
  type: 'search' | 'gps';
  keyword: string;
}

export const Map = (props: MapProps) => {
  const { type, keyword } = props;

  const callback = (map: any) => (data: PlaceTypes[], status: string) => {
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
      level: 3,
    };

    const map = new window.kakao.maps.Map(container, options);

    const ps = new window.kakao.maps.services.Places(map);

    if (type === 'search') ps.keywordSearch(keyword, callback(map));
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
  }, []);

  return <div id="map" className="w-full h-full" />;
};
