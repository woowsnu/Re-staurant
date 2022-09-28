import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import styles from './BookMark.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import resInfoAPI from '../../api/resInfoAPI';
import AuthContext from '../../store/auth-context';

const BookMark = (props) => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  const [editMark, setEditMark] = useState(props.editMark);
  const [busId, setBusId] = useState(props.data.busId);

  // useEffect(() => {
  //   const fetchBookmark = async () => {
  //     try {
  //       const data = await resInfoAPI.getUserBookMark();
  //       const filterByBusID = data.filter((el)=>el.busId === busId);
  //       console.log(filterByBusID)
  //       if (filterByBusID[0].statusLike === 1) {
  //         setEditMark(true);
  //       } else if (filterByBusID[0].statusLike === 0) {
  //         setEditMark(false);
  //       }
  //     } catch (error) {
  //       console.error('북마크를 불러오지 못했습니다.', error);
  //     }
  //   };
  //   fetchBookmark();
  // }, [editMark]);

  //북마크 추가
  const createBookmarkHandler = async () => {
    if (!ctx.isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    const data = await resInfoAPI.createUserBookMark(busId);
    console.log(data)
    setEditMark(true);
  };

  // 북마크 삭제
  const deleteBookmarkHandler = async () => {
    const response = await resInfoAPI.deleteUserBookMark(busId);
    if(response.status === 200){
      setEditMark(false);
    }
  };

  return (
    <>
      {editMark ? (
        <label
          htmlFor='bookmark'
          className={styles.bookmark}
          onClick={deleteBookmarkHandler}
        >
          <FaBookmark />
        </label>
      ) : (
        <label
          htmlFor='bookmark'
          className={styles.bookmark}
          onClick={createBookmarkHandler}
        >
          <FaRegBookmark />
        </label>
      )}
      <input id='bookmark' type='checkbox' checked={editMark} readOnly/>
    </>
  );
};

export default BookMark;
