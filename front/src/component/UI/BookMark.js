import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/axios';
import styles from './BookMark.module.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const BookMark = (props) => {
  const userEmail = localStorage.getItem('email');
  const token = localStorage.getItem('accessToken');
  const isLogin = !!token;
//   const bizId = useParams().id;
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState('');
  const [editMark, setEditMark] = useState(props.editMark);

  useEffect(() => {
    const fetchBookmark = async () => {
      try {
        const res = await instance.get(
          `/restaurant/${userEmail}/auth/findUserView`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const bookmarkArray = res.data;
        const filterByBusId = bookmarkArray.filter((el) => el.busId === props.data?.busId);
        if (filterByBusId.length > 0) {
          setBookmark(filterByBusId[0]);
          setEditMark(true);
        } else if (filterByBusId.length === 0) {
          setEditMark(false);
        }
      } catch (error) {
        console.error('북마크를 불러오지 못했습니다.', error);
      }
    };
    fetchBookmark();
  }, [editMark]);

  //북마크 추가
  const createBookmarkHandler = async () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
      navigate('/login');
      return;
    }
    const bookmarkData = {
      busId: props.data.busId,
      email: userEmail,
    };
    const { data } = await instance.post(
      `/restaurant/createLike/auth`,
      bookmarkData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    console.log(data);
    setEditMark(true);
  };

  // 북마크 삭제
  const deleteBookmarkHandler = async () => {
    const res = await instance.delete(
      `/restaurant/${bookmark}/auth/deleteLike`,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setBookmark('');
    setEditMark(false);
    console.log(res);
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
