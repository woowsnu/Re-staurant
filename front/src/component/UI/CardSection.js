import Slider from 'react-slick';
import MainPhotoCard from './MainPhotoCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CardSection = (props) => {
  const settings = {
    lazyLoad: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    swipe: true,
    draggable: true,
    centerMode : true,
  };

  return (
    <Slider style={{ width: '100%' }} {...settings}>
      
      {props.list.map((item, i)=>{<div><MainPhotoCard key={i} data={item} editMark={!!item.likeIndex}/></div>})}
      
    </Slider>
  );
};

export default CardSection;
