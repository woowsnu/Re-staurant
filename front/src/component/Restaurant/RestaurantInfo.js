import React from 'react';
import styles from './RestaurantInfo.module.css';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

const RestaurantInfo = (props) => {
  const position = { lat: props.restaurant.x, lng: props.restaurant.y };

  return (
    <div id='res-info' className={styles.container}>
      <div>
        <h3>영업시간</h3>
        {!props.restaurant.businessHourInfo?.includes('|') && (
          <p>{props.restaurant.businessHourInfo}</p>
        )}
        <ul>
          {props.restaurant.businessHourInfo?.includes('|') &&
            props.restaurant.businessHourInfo.split('|').map((hour, i) => {
              return <li key={i}>{hour}</li>;
            })}
        </ul>
        <p></p>
      </div>
      <div>
        <h3>편의시설</h3>
        {/* <div>
          {props.options.map((option) => {
            return (
              <img key={option.id} src={option.iconURL} alt={option.name} />
            );
          })}
        </div> */}
      </div>
      <div>
        <h3>전화번호</h3>
        <p>{props.restaurant.tellNumber}</p>
      </div>
      {props.restaurant.snsUrl && (
        <div>
          <h3>SNS</h3>
          <p>{props.restaurant.snsUrl}</p>
        </div>
      )}
      <div>
        <h3>위치정보</h3>
        <p style={{ paddingBottom: '1rem' }}>
          {props.restaurant.fullRoadAddress}
        </p>
        <RenderAfterNavermapsLoaded ncpClientId={'2ebca41zbe'}>
          <NaverMap
            mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
            style={{
              width: '80%',
              height: '400px',
              paddingBottom: '1rem',
            }}
            defaultCenter={position}
            defaultZoom={17}
          >
            <Marker position={position} />
          </NaverMap>
        </RenderAfterNavermapsLoaded>
        {/* <button>레스토랑 길찾기</button> */}
      </div>
    </div>
  );
};

export default RestaurantInfo;
