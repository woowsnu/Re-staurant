import React, { useState } from 'react';
import styles from './ImageSlider.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [style, setStyle] = useState({
    transform: '',
    transition: '',
  });

  const nextSlide = () => {
    setCurrentIndex(currentIndex + 1);
    setStyle({
      transform: `translateX(-${currentIndex + 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex - 1);
    setStyle({
      transform: `translateX(-${currentIndex - 1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  };

  const resetIndex = () => {
    setCurrentIndex(0)
    setStyle({
      transform: `translateX(-${1}00%)`,
      transition: `all 0.4s ease-in-out`,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.imgwrap}>
        {images?.map((image) => {
          return (
            <div key={image.id} style={style}>
              <img className={styles.imgbox} src={image.url} alt={image.id} />
            </div>
          );
        })}
      </div>
      <div className={styles.btns}>
        <button onClick={currentIndex < 0 ? resetIndex : prevSlide}>
          <FaAngleLeft />
        </button>
        <button onClick={currentIndex > images.length ? resetIndex :nextSlide}>
          <FaAngleRight />
        </button>
      </div>
      <div className={styles.counts}>
        <h1>
          {currentIndex + 1} / {images?.length}
        </h1>
      </div>
    </div>
  );
};

export default ImageSlider;
