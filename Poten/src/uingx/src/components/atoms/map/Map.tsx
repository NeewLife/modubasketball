import React, { useEffect } from 'react';

interface MapProps {
  level?: number;
  center?: number[];
}

export const Map = (props: MapProps) => {
  const { level = 3, center = [33.450701, 126.570667] } = props;

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(center),
      level: level,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return <div id="map" className="w-screen h-screen" />;
};
