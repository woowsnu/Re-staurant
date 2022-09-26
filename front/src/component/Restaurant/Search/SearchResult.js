import React, { useEffect, useState } from "react";
import { instance } from "../../../api/axios";
import PhotoCard from "../../UI/PhotoCard";
import ListCard from "../../UI/ListCard";
import Pagination from "../../UI/Pagination";
import styles from "./SearchResult.module.css";
import { useParams } from "react-router-dom";
import SearchNoResult from "./SearchNoResult";

const SearchResult = () => {
  const [resNameData, setResNameData] = useState("");
  const [categoryData, setCategoryData] = useState("");
  const [dataFetch, setDataFetch] = useState(false);
  const [searchFail, setSearchFail] = useState(false);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 7;

  const searchWord = useParams().id;

  const getResName = () => {
    return instance.get(`restaurant/${searchWord}`);
  };

  const getCategory = () => {
    return instance.get(`restaurant/search?restaurantCategory=${searchWord}`);
  };

  useEffect(() => {
    Promise.all([getResName(), getCategory()])
      .then(([res1, res2]) => {
        setDataFetch(true);
        if (res1 === undefined && res2 === undefined) {
          setSearchFail(true);
        }
        setResNameData(res1.data);
        setCategoryData(res2.data);
      })
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
              <div className={styles.reviewRecommend}>
                {searchWord} 관련 베스트 리뷰 ✨
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
      ) : (
        ""
      )}
    </>
  );
};

export default SearchResult;