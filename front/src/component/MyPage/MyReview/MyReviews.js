import React, { useState } from "react";
import styles from "./MyReviews.module.css";
import Button from "../../UI/Button";
import ReviewDelete from "./ReviewDelete";
import ReviewEdit from "./ReviewEdit";

const MyReviews = (props) => {
  const [reviewEdit, setReviewEdit] = useState(false);
  const [reviewDelete, setReviewDelete] = useState(false);
  const [reviewIndex, setReviewIndex] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [imgNull, setImgNull] = useState(false);

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

  return (
    <>
      <h3 className={styles.reviewCount}>
        작성한 리뷰가 {review.length}개 있어요
      </h3>
      <div className={styles.container}>
            {review.map((data) => (
              <>
                <div className={styles.reviewCard}>
                  <span className={styles.editbuttons}>
                    <div className={styles.resTitle}>{data.busId}</div>
                    <div className={styles.editbutton}>
                      <Button
                        onClick={() => {
                          setReviewIndex(data.reviewIndex);
                          setReviewTitle(data.reviewTitle);
                          setReviewContent(data.reviewContent);
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
                      </Button>
                    </div>
                  </span>
                  <div className={styles.reviews}>
                    <div className={styles.reviewTitle}>
                      "{data.reviewTitle}"
                    </div>
                    {data.reviewContent}
                  </div>
                  { data.reviewImage === "null" ? "" :
                  <div>
                    <img src={data.reviewImage} className={styles.img} />
                  </div> }
                </div>
                <div className={styles.blank}>{""}</div>
              </>
            ))}
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
