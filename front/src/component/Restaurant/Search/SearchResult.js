import React, { useContext, useEffect, useState } from "react";
import { instance } from "../../../api/axios";
import PhotoCard from "../../UI/PhotoCard";
import ListCard from "../../UI/ListCard";
import Pagination from "../../UI/Pagination";
import styles from "./SearchResult.module.css";
import { useParams } from "react-router-dom";
import SearchNoResult from "./SearchNoResult";
import Loader from "../../UI/Loader";

const SearchResult = () => {
  const [resNameData, setResNameData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [dataFetch, setDataFetch] = useState(false);
  const [searchFail, setSearchFail] = useState(false);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 7;

  const searchWord = useParams().id;

  useEffect(() => {
    const getResName = () => {
      return instance.get(`/api/search?restaurantName=${searchWord}`);
    };
    const getCategory = () => {
      return instance.get(`/api/search?restaurantCategory=${searchWord}`);
    };
    
    Promise.all([getResName(), getCategory()]).then(([res1, res2]) => {
      setDataFetch(true);
      setResNameData("");
      setCategoryData("");
      if (res1 === undefined && res2 === undefined) {
        setSearchFail(true);
      } else if (res1 !== undefined && res2 === undefined) {
        setSearchFail(false);
        setResNameData(res1.data);
      } else if (res1 === undefined && res2 !== undefined) {
        setSearchFail(false);
        setCategoryData(res2.data);
      } else if (res1 !== undefined && res2 !== undefined) {
        setSearchFail(false);
        setResNameData(res1.data);
        setCategoryData(res2.data);
      }
    });
  }, [searchWord]);
  
  const resData = Object.assign(resNameData, categoryData);
  const objectToData = Object.values(resData);
  
  return (
    <>
      {dataFetch ? (
        <div>
          {searchFail ? (
            <SearchNoResult />
          ) : (
            <>
              {/* <div className={styles.reviewRecommend}>
                {searchWord} 관련 베스트 리뷰 ✨
              </div>
              <div className={styles.photocards}>
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
                <PhotoCard />
              </div>
              <br /> */}
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default SearchResult;
