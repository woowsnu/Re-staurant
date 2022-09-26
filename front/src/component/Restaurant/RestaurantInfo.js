import React from 'react';
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from 'react-icons/fa';
import styles from './RestaurantInfo.module.css';
import Map from '../UI/Map';

const RestaurantInfo = ({ restaurant, options }) => {
  const { restaurantName, x, y, businessHourInfo, tellNumber, snsUrl } =
    restaurant;
  const position = { lat: x, lng: y };

  return (
    <div id='res-info' className={styles.container}>
      <div>
        <h3>영업시간</h3>
        {businessHourInfo === 'None' ? (
          <div>
            영업시간 정보를 제공하지 않는 매장입니다. 매장으로 문의해주세요.
          </div>
        ) : (
          <ul>
            {businessHourInfo?.includes('|') ? (
              businessHourInfo.split('|').map((hour, i) => {
                return <li key={i}>{hour}</li>;
              })
            ) : (
              <li>{businessHourInfo}</li>
            )}
          </ul>
        )}
      </div>
      {options.length > 0 && (
        <div>
          <h3>편의시설</h3>
          <div className={styles.option}>
            {options.map((option) => {
              return (
                <img
                  key={option.optionId}
                  src={option.iconUrl}
                  alt={option.optionName}
                />
              );
            })}
          </div>
        </div>
      )}
      {tellNumber && (
        <div>
          <h3>전화번호</h3>
          <p>{tellNumber}</p>
        </div>
      )}

      {snsUrl && (
        <div>
          <h3>SNS</h3>
          <p>{snsUrl}</p>
        </div>
      )}
      <h3>위치정보</h3>
      <Link
        to={`//map.kakao.com/link/to/${restaurantName},${y},${x}`}
        target='_blank'
        rel='noopener noreferrer'
      >
        <button className={styles.mapbtn}>
          <p>지도에서 길찾기</p>
          <FaExternalLinkAlt style={{ fontSize: '12px'}}/>
        </button>
      </Link>
      <Map position={position} />
      
    </div>
  );
};

export default RestaurantInfo;
