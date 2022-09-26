import React, { useState } from "react";
import styles from "./MyReviews.module.css";
import Button from "../../UI/Button";
import ReviewDelete from "./ReviewDelete";
import ReviewEdit from "./ReviewEdit";
import Pagination from "../../UI/Pagination";

const MyReviews = (props) => {
  const [reviewEdit, setReviewEdit] = useState(false);
  const [reviewDelete, setReviewDelete] = useState(false);
  const [reviewIndex, setReviewIndex] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [revisit, setRevisit] = useState("");
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 7;

  const reviewEditOpenHandler = () => {
    setReviewEdit(true);
  };
  const reviewEditCloseHandler = () => {
    setReviewEdit(false);
  };

  const reviewDeleteOpenHandler = () => {
    setReviewDelete(true);
  };
  const reviewDeleteCloseHandler = () => {
    setReviewDelete(false);
  };

  const updateHandler = () => {
    props.updateHandler();
  };

  const review = props.user.reviewList;
  const ourReview = props.user.reviewList?.filter((el) => el.tag === 1);

  return (
    <>
      <h3 className={styles.reviewCount}>
        작성한 리뷰가 {review.length}개 있어요
      </h3>
      <div className={styles.container}>
        {review.slice(offset, offset + 7).map((data) => (
          <>
            <div className={styles.reviewCard}>
              <span className={styles.editbuttons}>
                <span className={styles.revisit}>
                  {data.revisit === 1
                    ? "재방문 할래요 😘"
                    : "재방문 안할래요 ☹️"}
                </span>
                {props.user.email === localStorage.getItem("email") ? (
                  <div className={styles.editbutton}>
                    <Button
                      onClick={() => {
                        setReviewIndex(data.reviewIndex);
                        setReviewTitle(data.reviewTitle);
                        setReviewContent(data.reviewContent);
                        setRevisit(data.revisit);
                        reviewEditOpenHandler();
                      }}
                      style={{ marginRight: "6px" }}
                    >
                      수정
                    </Button>
                    <Button
                      onClick={() => {
                        setReviewIndex(data.reviewIndex);
                        reviewDeleteOpenHandler();
                      }}
                    >
                      삭제
                    </Button>{" "}
                  </div>
                ) : (
                  ""
                )}
              </span>
              <div className={styles.resTitle}>
                {data.restaurantName}
                <span className={styles.date}>
                  작성 : {data.createDate.slice(0, 10)}{" "}
                  {data.createDate.slice(11, 16)}
                </span>
              </div>
              <div className={styles.reviews}>
                { data.tag === 1 ? (
                  <div className={styles.reviewTitle}>"{data.reviewTitle}"</div>
                ) : (
                  ""
                )}
                {data.reviewContent}
              </div>
              {data.reviewImage === "" ? (
                ""
              ) : (
                <div>
                  <img src={data.reviewImage} className={styles.img} />
                </div>
              )}
            </div>
            <div className={styles.blank}>{""}</div>
          </>
        ))}
        {review.length === 0 ? (
          ""
        ) : (
          <Pagination total={review.length} page={page} setPage={setPage} />
        )}
        {reviewDelete ? (
          <ReviewDelete
            reviewIndex={reviewIndex}
            updateHandler={updateHandler}
            reviewDeleteClose={reviewDeleteCloseHandler}
          />
        ) : (
          ""
        )}
        {reviewEdit ? (
          <ReviewEdit
            reviewIndex={reviewIndex}
            reviewTitle={reviewTitle}
            reviewContent={reviewContent}
            revisit={revisit}
            updateHandler={updateHandler}
            reviewEditClose={reviewEditCloseHandler}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default React.memo(MyReviews);