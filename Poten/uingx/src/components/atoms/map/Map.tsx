import React, { useEffect } from 'react';

interface MapProps {
  level?: number;

  center?: {
    lat: number;
    lot: number;
  };
}

export const Map = (props: MapProps) => {
  const { level = 3, center = { lat: 33.450701, lot: 126.570667 } } = props;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lot),
      level: level,
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const map = new window.kakao.maps.Map(container, options);
  }, [level, center]);

  return <div id="map" className="w-full h-full" />;
};
