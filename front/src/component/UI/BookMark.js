import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import styles from './BookMark.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import resInfoAPI from '../../api/resInfoAPI';
import AuthContext from '../../store/auth-context';

const BookMark = (props) => {
  const ctx = useContext(AuthContext)
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('accessToken');
  const isLogin = !!token;
  const navigate = useNavigate();
  const [likeIndex, setLikeIndex] = useState('');
  const [editMark, setEditMark] = useState(props.editMark);
  const [busId, setBusId] = useState(props.data.busId);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const data = await resInfoAPI.getUserBookMark();
        const bookmarkArray = data;
        const filterByBusId = bookmarkArray.filter((el) => el.busId === props.data?.busId);
        if (filterByBusId.length > 0) {
          setLikeIndex(filterByBusId[0].likeIndex);
          console.log(filterByBusId[0].likeIndex)
          setEditMark(true);
        } else if (filterByBusId.length === 0) {
          setEditMark(false);
        }
      } catch (error) {
        console.error('북마크를 불러오지 못했습니다.', error);
      }
    };
    fetchBookmark();
  }, []);

  //북마크 추가
  const createBookmarkHandler = async () => {
    if (!ctx.isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    const bookmarkData = {
      busId: busId,
    };
    const data = await resInfoAPI.createUserBookMark(bookmarkData);
    console.log(data)
    setEditMark(true);
  };

  // 북마크 삭제
  const deleteBookmarkHandler = async () => {
    const data = await resInfoAPI.deleteUserBookMark(likeIndex);
    console.log(data);
    setLikeIndex('');
    setEditMark(false);
  };
  return (
    <>
      {editMark ? (
        <label htmlFor='bookmark' className={styles.bookmark} onClick={deleteBookmarkHandler}>
          <FaBookmark />
        </label>
      ) : (
        <label htmlFor='bookmark' className={styles.bookmark} onClick={createBookmarkHandler}>
          <FaRegBookmark />
        </label>
      )}
      <input id='bookmark' type='checkbox' checked={editMark} />
    </>
  );
};

export default BookMark;
