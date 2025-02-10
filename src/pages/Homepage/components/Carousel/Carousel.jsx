import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import useEmblaCarousel from 'embla-carousel-react';
import PropTypes from 'prop-types';
import './style.css';

const TWEEN_FACTOR_BASE = 0.84;
const numberWithinRange = (number, min, max) => Math.min(Math.max(number, min), max);

const Carousel = ({ options, items }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const setTweenFactor = useCallback(emblaApi => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenOpacity = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();

    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach(slideIndex => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach(loopItem => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
        const opacity = numberWithinRange(tweenValue, 0, 1).toString();
        const brightness = numberWithinRange(tweenValue, 0.5, 1).toString();
        const height = numberWithinRange(tweenValue, 0.9, 1).toString();
        emblaApi.slideNodes()[slideIndex].style.filter = `brightness(${brightness})`;
        emblaApi.slideNodes()[slideIndex].querySelector('a').querySelector('img').style.height =
          `${19 * height}em`;
        emblaApi.slideNodes()[slideIndex].querySelector('div').style.opacity =
          `${opacity < 0.2 ? 0 : opacity}`;
      });
    });
  }, []);
  const onScroll = useCallback(emblaApi => {
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, []);
  useEffect(() => {
    if (!emblaApi) return;
    onScroll(emblaApi);
    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on('reInit', setTweenFactor)
      .on('reInit', tweenOpacity)
      .on('scroll', tweenOpacity)
      .on('slideFocus', tweenOpacity)
      .on('reInit', onScroll)
      .on('scroll', onScroll)
      .on('slideFocus', onScroll);
  }, [emblaApi, tweenOpacity, onScroll]);

  return (
    <div className="my-30 relative">
      <div className="embla h-400">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {items.map((item, index) => (
              <div className="embla__slide" key={index}>
                <Link className="block relative" to={`/detail/${item.contentId}`}>
                  <img src={item.imageURL} alt={item.imageName} className="embla__slide__img " />
                  <span className="text-white text-10 font-semibold absolute bottom-10 left-10">
                    {item.imageName}
                  </span>
                </Link>
                <div className="mt-20 flex flex-col justify-center items-center">
                  <h3 className="font-bold text-24 flex justify-center">{item.title}</h3>
                  <span className="block font-semibold text-17 text-gray-7 mt-10">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full  flex justify-center items-center">
        <div className="embla__progress bg-gray-5">
          <div
            className="embla__progress__bar bg-primary-1"
            style={{ transform: `translate3d(${scrollProgress}%,0px,0px)` }}
          />
        </div>
      </div>
    </div>
  );
};
export default Carousel;

Carousel.propTypes = {
  options: PropTypes.shape({
    align: PropTypes.string.isRequired,
    loop: PropTypes.bool.isRequired,
  }),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      subtitle: PropTypes.string.isRequired,
      imageName: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
      contentId: PropTypes.string.isRequired,
    }),
  ),
};
