import React from "react";
import { useLocation } from "react-router-dom";
import ReviewImgUpload from "./ReviewImgUpload";

const ReviewWrite = () => {
  const restaurant = useLocation().state;
  return (
    <div>
      <div>
        <img src={restaurant.img} />
        <p>{restaurant.category}</p>
        <p>
          {restaurant.address.split(" ", 1) +
            " " +
            restaurant.address.split(" ", 2).slice(1, 2)}
        </p>
        <p>{restaurant.name}</p>
      </div>
      <form>
        <h3>{restaurant.name}에 재방문 하시겠어요?</h3>
        <input type="radio" name="revisit" value="1"/>재방문 할래요
        <input type="radio" name="revisit" value="0"/>재방문 안할래요
        <h3>한줄평</h3>
        <input type="text" placeholder="한줄평을 작성해주세요" />
        <h3>사진첨부</h3>
        <p>사진은 최대 5장까지 등록 가능합니다.</p>
        <ReviewImgUpload />
        <h3>상세리뷰</h3>
        <textarea placeholder="이 곳에서의 경험은 어떠셨나요? 맛, 위생, 주차 등 회원님의 경험을 들려주세요."></textarea>
        <button>작성취소</button>
        <button>작성완료</button>
      </form>
    </div>
  );
};

export default ReviewWrite;
