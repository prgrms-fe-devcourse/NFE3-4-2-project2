import Carousel from './Carousel';
import MAIN_CAROUSEL_PLACES from '@/constants/mainCarouselPlaces';

const CarouselWrapper = () => {
  const options = { align: 'center', loop: true };
  return <Carousel options={options} items={MAIN_CAROUSEL_PLACES} />;
};

export default CarouselWrapper;
