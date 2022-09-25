import React, { useState, useEffect } from 'react'
import { instance } from '../../../api/axios';
import styles from "./SearchResult.module.css";
import PhotoCard from '../../UI/PhotoCard';
import ListCard from '../../UI/ListCard';
import Pagination from '../../UI/Pagination';

const SearchResult2 = (props) => {
  const [update, setUpdate] = useState(false);
  const [resNameData, setResNameData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 7;
 
  const getResName = () => {
    return instance.get(`restaurant/${props.keyword}`);
  };
  const getCategory = () => {
    return instance.get(
      `restaurant/search?restaurantCategory=${props.keyword}`
    );
  };

  useEffect(() => {
    Promise.all([getResName(), getCategory()])
      .then(([res1, res2]) => {
        setResNameData(res1.data);
        setCategoryData(res2.data);
        setUpdate(!update);
      })
      .catch(([err1, err2]) => {
        console.log(err1);
        console.log(err2);
      });
  }, [update]);

  const resData = Object.assign(resNameData, categoryData);
  const objectToData = Object.values(resData);

  return (
    <div>
        {resData.length === 0 ? (
        ""
      ) : (
        <>
          <div className={styles.reviewRecommend}>
            {props.keyword} 관련 베스트 리뷰 ✨
          </div>
          <div className={styles.photocards}>
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
            <PhotoCard />
          </div>
          <br />
          <div className={styles.reviewRecommend}>검색 결과 🔎</div>
          <div>
            {objectToData.slice(offset, offset + 7).map((data) => (
              <>
                <ListCard key={data.busId} data={data} />
                <div className={styles.linebreak}>{""}</div>
              </>
            ))}
          </div>
          <Pagination
            total={objectToData.length}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </div>
  )
}

export default SearchResult2