import ReactSlick from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Slider = ({ children }) => {
  const settings = {
    lazyLoad: true,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    draggable: true,
    nextArrow: <div style={{background: 'red'}}><FaAngleRight /></div>,
    prevArrow: <div><FaAngleLeft /></div>
  };

  return (
    <ReactSlick style={{ width: '100%' }} {...settings}>
      {children}
    </ReactSlick>
  );
};

export default Slider;
