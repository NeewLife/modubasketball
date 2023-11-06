import React, { useEffect } from 'react';

import './index.css';

export const App = () => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);
  }, []);

  return <div id="map" className="w-screen h-screen" />;
};
