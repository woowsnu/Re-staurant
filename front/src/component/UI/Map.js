/* global kakao */
import React, { useEffect } from 'react';

const { kakao } = window;

const Map = (props) => {
const {lat, lng} = props.position;
  useEffect(() => {
    let container = document.getElementById('map');

    let options = {
      center: new window.kakao.maps.LatLng(lng, lat),
      level: 3,
    };

    let map = new window.kakao.maps.Map(container, options);

    map.setDraggable(false);
    map.setZoomable(false);


    let markerPosition = new kakao.maps.LatLng(lng, lat);
      let marker = new kakao.maps.Marker({
        position: markerPosition,
      });
  
      marker.setMap(map);
  }, [lat, lng]);

  return (
    <div>
      <div
        id='map'
        style={{
          width: '600px',
          height: '400px',
        }}
      ></div>
    </div>
  );
};

export default Map;
