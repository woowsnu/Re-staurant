import React, { useRef, useState, useEffect } from 'react';
import styles from './ImageSlider.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const ImageSlider = ({ images }) => {
  const ref = useRef(null)
  const [imageList, setImageList] = useState([
    images[images?.length -1],
    ...images,
    images[0]
  ])
  const [currentIndex, setCurrentIndex] = useState(1);
  const [style, setStyle] = useState({
    transform: `translateX(-${currentIndex}00%)`,
    transition: `all 0.4s ease-in-out`,
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

  useEffect(() => {
    if (currentIndex === 0) {
      setCurrentIndex(imageList.length - 2);
      setTimeout(function () {
        setStyle({
          transform: `translateX(-${imageList.length - 2}00%)`,
          transition: '0ms',
        });
      }, 500);
    }

    if (currentIndex >= imageList?.length - 1) {
      setCurrentIndex(1);
      setTimeout(() => {
        setStyle({
          transform: `translateX(-${1}00%)`,
          transition: '0ms',
        });
      }, 500);
    }
  }, [currentIndex, imageList.length]);

  useEffect(() => {
    setStyle({
      transform: `translateX(-${1}00%)`,
      transition: '0ms',
    });
  }, [imageList]);

  return (
    <div className={styles.container}>
      <div ref={ref} className={styles.imgwrap}>
        {imageList.map((image) => {
          return (
            <div key={image.id} style={style}>
              <img className={styles.imgbox} src={image.url} alt={image.id} />
            </div>
          );
        })}
      </div>
      <div className={styles.btns}>
        <button onClick={prevSlide}>
          <FaAngleLeft />
        </button>
        <button onClick={nextSlide}>
          <FaAngleRight />
        </button>
      </div>
      <div className={styles.counts}>
        <h1>
          {currentIndex} / {images?.length}
        </h1>
      </div>
    </div>
  );
};

export default ImageSlider;